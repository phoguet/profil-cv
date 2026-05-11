import fs from 'fs'
import path from 'path'
import Anthropic from '@anthropic-ai/sdk'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { message, language, history = [] } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Le champ "message" est requis.' })
    }

    const cvPath = path.join(__dirname, '../assets/cv-data.md')
    const cvContent = fs.readFileSync(cvPath, 'utf-8')

    const lang = language === 'en' ? 'anglais' : 'français'

    const systemPrompt = `Tu es l'assistant CV de Pascal Hoguet.
Tu réponds UNIQUEMENT aux questions sur son parcours professionnel, ses compétences, ses expériences, ses projets et sa disponibilité.
Pour toute autre question, décline poliment et invite à consulter le CV ou à contacter Pascal directement.
Réponds en ${lang} selon la langue demandée (fr = français, en = anglais).
Sois concis : 3 à 5 phrases maximum par réponse.

=== CONTENU DU CV ===
${cvContent}`

    const recentHistory = Array.isArray(history) ? history.slice(-6) : []

    const messages = [
      ...recentHistory,
      { role: 'user', content: message }
    ]

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 400,
      system: systemPrompt,
      messages
    })

    const reply = response.content[0].text

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('[api/chat] error:', err)
    return res.status(500).json({ error: 'Une erreur s\'est produite.' })
  }
}
