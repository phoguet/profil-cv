const fs = require('fs')
const path = require('path')
const Anthropic = require('@anthropic-ai/sdk')

// ── 1. Server-side rate limiting (in-memory, 20 req/hour per IP) ──────────────
const rateLimitMap = new Map()
const RATE_LIMIT_MAX = 20
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

// ── 4. Prompt injection detection ─────────────────────────────────────────────
const INJECTION_PATTERNS = [
  /ignore\s+(les\s+)?instructions/i,
  /oublie\s+(les\s+)?instructions/i,
  /forget\s+(your\s+|all\s+|previous\s+)?instructions/i,
  /ignore\s+(previous|prior|all)/i,
  /system\s*prompt/i,
  /tu\s+es\s+maintenant/i,
  /you\s+are\s+now/i,
  /nouveau\s+r.le/i,
  /new\s+role/i,
  /jailbreak/i,
]

function hasInjection(text) {
  return INJECTION_PATTERNS.some(p => p.test(text))
}

// ─────────────────────────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

  // 1. Rate limit by IP
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket?.remoteAddress
    || 'unknown'
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Trop de requêtes. Réessayez dans une heure.' })
  }

  try {
    const { message, language, history = [] } = req.body

    // Message validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Le champ "message" est requis.' })
    }
    if (message.length > 500) {
      return res.status(400).json({ error: 'Message trop long.' })
    }

    // 4. Prompt injection check
    if (hasInjection(message)) {
      return res.status(400).json({ error: 'Message non valide.' })
    }

    // 3. History validation : rôles stricts + longueur max par entrée
    const MAX_ENTRY_LENGTH = 500
    const recentHistory = Array.isArray(history)
      ? history
          .filter(m =>
            (m.role === 'user' || m.role === 'assistant') &&
            typeof m.content === 'string' &&
            m.content.length <= MAX_ENTRY_LENGTH
          )
          .slice(-6)
      : []

    const cvPath = path.join(__dirname, '../assets/cv-data.md')
    const cvContent = fs.readFileSync(cvPath, 'utf-8')

    const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

    const systemPrompt = language === 'en'
      ? `You are Pascal Hoguet's AI assistant.
Today's date: ${today}.
You MUST always reply in English only, regardless of the language of the CV content below.
Answer ONLY questions about his professional background, skills, experiences, projects, and availability.
For any other question, politely decline and invite the user to consult the CV or contact Pascal directly.
Be concise: 3 to 5 sentences maximum per response.
Tone: professional and friendly.
Format: plain text only — no markdown, no asterisks, no bullet dashes, no emoji.

=== CV CONTENT ===
${cvContent}`
      : `Tu es l'assistant IA de Pascal Hoguet.
Date du jour : ${today}.
Tu réponds UNIQUEMENT aux questions sur son parcours professionnel, ses compétences, ses expériences, ses projets et sa disponibilité.
Pour toute autre question, décline poliment et invite à consulter le CV ou à contacter Pascal directement.
Réponds exclusivement en français.
Sois concis : 3 à 5 phrases maximum par réponse.
Ton : professionnel et amical, avec vouvoiement obligatoire en français (jamais de tutoiement).
Format : texte brut uniquement — aucun markdown, aucun astérisque, aucun tiret de liste, aucun emoji.

=== CONTENU DU CV ===
${cvContent}`

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 400,
      system: systemPrompt,
      messages: [...recentHistory, { role: 'user', content: message }],
    })

    const reply = response.content?.[0]?.text ?? ''

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('[api/chat] error:', err)
    return res.status(500).json({ error: "Une erreur s'est produite." })
  }
}
