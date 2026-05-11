# CV HTML — Pascal Hoguet

CV personnel au format HTML, bilingue FR/EN, dark theme premium.
Hébergé sur Vercel, versionné sur GitHub (phoguet/profil-cv).

## Stack
- HTML5 / CSS3 / Vanilla JavaScript (aucune dépendance frontend)
- Google Fonts : Playfair Display + Inter
- Chatbot : Claude Haiku 3.5 via API Anthropic (fonction Vercel serverless)
- Déployé sur Vercel (statique + serverless)

## Structure
- `index.html` : page principale, tout le contenu FR+EN
- `assets/styles.css` : styles dark theme + @media print
- `assets/main.js` : toggle FR/EN + animations + widget chatbot
- `assets/cv-data.md` : base de connaissance du chatbot (source de vérité)
- `assets/portrait.png` : photo de profil
- `api/chat.js` : fonction Vercel serverless — endpoint POST /api/chat
- `package.json` : dépendance `@anthropic-ai/sdk` (pour la fonction serverless)
- `docs/spec.md` : spécification design et contenu

## Conventions
- Contenu bilingue via `data-lang="fr"` / `data-lang="en"`
- Palette de couleurs dans les CSS custom properties (début de styles.css)
- Pas de framework JS, pas de build step
- Pour tester localement : `vercel dev` (nécessite `.env.local` avec `ANTHROPIC_API_KEY`)
- `.env.local` ne doit jamais être commité (voir `.gitignore`)

## Chatbot
- Widget flottant bottom-right, bilingue FR/EN automatique
- Limité aux questions sur le CV de Pascal (scope restreint dans le system prompt)
- Source de données : `assets/cv-data.md` — à mettre à jour en même temps que `index.html`
- Rate limiting côté client : 10 messages max par session (sessionStorage)
- Clé API en production : variable d'environnement Vercel `ANTHROPIC_API_KEY`

## Déploiement
- Push sur `main` → déploiement automatique Vercel
- URL : https://profil-cv.vercel.app (ou domaine personnalisé configuré dans Vercel)
- Variable d'environnement requise en prod : `ANTHROPIC_API_KEY`
