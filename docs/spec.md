# Spécification — CV HTML Pascal Hoguet

## Objectif

CV personnel au format HTML, page unique, bilingue FR/EN. Double cible :
- **Recrutement CDI** : postes Directeur de programme, CDO, expert IA
- **Développement commercial** : consultant expert indépendant

## Design

### Esthétique générale
Style **Dark Hero Magazine** : fond bleu nuit profond, typographie haut de gamme, photo grande format avec halo lumineux, timeline expériences pleine largeur, micro-animations au scroll.

### Palette de couleurs
| Variable | Valeur | Usage |
|---|---|---|
| `--bg-darkest` | `#060B18` | Fond principal / hero |
| `--bg-dark` | `#0A1428` | Sections alternantes |
| `--bg-medium` | `#0D1B3E` | Section bas de page |
| `--bg-section` | `#0F1E3D` | Profil + compétences |
| `--accent` | `#3B82F6` | Bleu électrique principal |
| `--accent-light` | `#60A5FA` | Accents secondaires |
| `--accent-muted` | `#93C5FD` | Texte coloré, dates |
| `--pill-bg` | `#1E3A5F` | Fond des tags compétences |
| `--text-primary` | `#FFFFFF` | Texte principal |
| `--text-secondary` | `rgba(255,255,255,0.80)` | Corps de texte |
| `--text-muted` | `#94A3B8` | Texte secondaire, contact |

### Typographie
- **Playfair Display** (Google Fonts, serif) : nom, titres de section
- **Inter** (Google Fonts, sans-serif) : corps, labels, tags, titres de poste

---

## Sections

### 1. Hero
Layout flex desktop : colonne gauche 42% (photo) + colonne droite flex:1 (identité).

#### Bandeau nom — `.hero-bg-name`
- `position: absolute; top: 48px; left: 0; width: 42%` — centré sur la colonne gauche
- Playfair Display, `clamp(28px, 3.2vw, 48px)`, blanc 92%, fond semi-transparent `rgba(6,11,24,0.55)` + `backdrop-filter: blur(6px)`
- Texte en casse normale : "Pascal Hoguet"
- Sur mobile (≤ 900px) : `position: relative`, pleine largeur, centré, sans fond

#### Colonne gauche — `.hero-left`
- `flex: 0 0 42%`
- Photo portrait : `border-radius` via mask-image elliptique, halo bleu `drop-shadow`
- `<canvas id="hero-particles">` positionné en absolu dans `.hero-left` — 50 particules bleues avec double passe (halo extérieur + cœur brillant), confinées à la colonne portrait

#### Colonne droite — `.hero-right`
- `padding: 36px 90px 32px 16px` (90px à droite pour dégager le toggle FR/EN)
- **Titre** : "DIRECTEUR DE PROJET" + "TRANSFORMATION NUMÉRIQUE & INTELLIGENCE ARTIFICIELLE" — Inter 18px, uppercase, letter-spacing 2px, `var(--accent)`
- **Séparateur** : 64px × 2px, dégradé bleu
- **Accroche** : 3 paragraphes, 14px italic, line-height 1.55
- **Stats** : 2 blocs — 25+ ans en direction · 50+ projets pilotés (Playfair 32px, compteurs animés au scroll)
- **Poste actuel** : badge "Actuellement en poste chez Onepoint" (bilingue) + liste 2 rôles
- **Tags secteurs** (4) : Secteur privé & secteur public · Data & IA · Plateformes agentiques & automatisation · Smart city & smart building
- **Bouton CTA** : "Me contacter" / "Contact me" → `mailto:phoguet@protonmail.com`
- **Contact** : icônes SVG — tél, email, LinkedIn (gap 28px)
- **Toggle FR/EN** : `position: fixed; top: 56px; right: 32px; z-index: 100`

### 2. Profil + Compétences
Layout 2 colonnes 60/40, fond `--bg-section`.

**Profil** : 5 paragraphes — double savoir-faire développement business et pilotage de P&L + expertise numérique/innovation · accélération commerciale · transformation numérique IA & Data · roadmap AI for consulting / plateforme agentique Elio · territoires intelligents.

**Compétences** : 3 groupes avec label catégorie :
- *Pilotage & Développement commercial* : Direction de projet à engagement · Stratégie offres & BD · Agile & Continuous Discovery & Delivery · Pilotage des équipes
- *Data & Intelligence Artificielle* : IA & Data · Nocode & Plateformes · Plateformes agentiques · Automatisations · Vibe coding & vibe designing
- *Territoires intelligents & durables* : Gouvernance data et IA · Accompagnement du territoire intelligent · Plateformes et hypervision urbaine

### 3. Expériences
Timeline verticale : `border-left: 2px solid var(--timeline-line)`, points lumineux bleus.
Dates affichées inline après le nom de l'entreprise (pas décalées à droite).
Titres de poste en Inter (sans-serif), non italique.

**Entrées détaillées** (avec bullets et réalisations) :
- Onepoint (depuis 2019) : Head of Roadmap AI for Consulting + Directeur de projet Territoires intelligents
- École des Ponts ParisTech (2019-2026) : Enseignant mastère AMUR & IBD
- Capgemini Nantes (2013-2019) : Directeur Centre d'Excellence + Directeur Lab'Innovation (avec bullet mission)
- ADEUZA/Sopra Group (2009-2013) : Directeur de production

**Entrées condensées** (poste + détails) :
- AIS Ouest (2005-2009) : Directeur des opérations
- Unilog (1996-2005) : 4 bullets — BU ECM · Commercial industrie · Chef/Directeur projet · Agence Luxembourg
- Alcatel TITN Answare (1993-1995) : Chargé de projet
- ICL France / ICL Europe (1990-1993) : Ingénieur études et développement — mention expérience franco-britannique (Vélizy & Bracknell, UK)

### 4. Formation + Centres d'intérêts + Contact
Layout 3 colonnes égales, fond `--bg-medium`.

- **Formation** : Ingénieur ISEN (Lille 1989) · Anglais courant · Certification INR
- **Centres d'intérêts** : 6 icônes SVG line art + label (grille 2×3)
- **Contact** : +33 6 46 20 55 26 · phoguet@protonmail.com · LinkedIn (adresse postale supprimée)

### 5. Footer
`© Pascal Hoguet · 2026`, centré, `--text-muted` 12px.

---

## Internationalisation

**Stratégie** : attributs `data-lang="fr"` / `data-lang="en"` sur chaque élément de contenu. Le JavaScript switche `display` sur clic du toggle. Par défaut : français visible.

**Règle absolue** : toute modification de contenu doit être appliquée dans les deux langues simultanément.

**Print** : toujours en français (contenu EN masqué en `@media print`).

---

## Animations & Interactivité

### Scroll reveal
**Intersection Observer API** : classe `.reveal` sur chaque section et entrée timeline. À l'entrée dans le viewport : `.reveal.visible` → `opacity 0→1`, `translateY 20px→0`, `transition: 0.5s ease`.

### Barre de progression scroll
`<div id="scroll-progress">` — `position: fixed; top: 0; height: 3px` — dégradé bleu `var(--accent)` → `var(--accent-light)`, largeur mise à jour sur l'événement `scroll`.

### Compteurs animés
Les `span.stat-number` dont le contenu commence par un chiffre (25+, 50+) sont animés de 0 à la valeur cible via `requestAnimationFrame`, ease-out cubic, durée 2,8s, déclenché par IntersectionObserver au seuil 0.5.

### Particules hero
`<canvas id="hero-particles">` à l'intérieur de `.hero-left` (position absolute, 100% × 100%, z-index 0, pointer-events none). 50 particules bleues avec double passe de dessin : halo extérieur (`shadowBlur: 18`) + cœur brillant (`shadowBlur: 10`). Masquées à l'impression.

### Tilt 3D photo
Événements `mousemove` / `mouseleave` sur `.hero-photo-wrap` : `perspective(600px) rotateX() rotateY() scale(1.05)`, tilt max ±16°. Retour fluide en 0.5s ease-out.

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| `> 900px` | Desktop : layout 2 colonnes, nom en bandeau absolu sur colonne gauche |
| `≤ 900px` | Tablet : layout colonne unique, nom en bandeau relatif pleine largeur en haut, puis photo, puis contenu |
| `≤ 600px` | Mobile : même structure, tailles et paddings réduits |

---

## Impression / Export PDF

`@media print` :
- Fond blanc, texte noir sur blanc
- Suppression des halos, box-shadows, gradients
- Animations désactivées (`opacity: 1 !important`, `transform: none !important`)
- Toggle langue masqué
- Canvas particules et barre progression masqués
- Contenu EN masqué (impression en FR uniquement)

---

## Chatbot conversationnel

Widget flottant alimenté par Claude Haiku 3.5 (API Anthropic), limité aux questions sur le CV.

### Architecture

```
Navigateur → POST /api/chat → Vercel Function → Claude Haiku 3.5
```

- **`api/chat.js`** : fonction serverless Vercel, endpoint `POST /api/chat`
- **`assets/cv-data.md`** : base de connaissance exclusive du chatbot (markdown pur, FR uniquement)
- Clé API : variable d'environnement `ANTHROPIC_API_KEY` (jamais dans le code)

### Comportement

- Widget fixe bottom-right (`z-index: 200`), s'ouvre/ferme par clic
- Langue automatique : suit le toggle FR/EN de la page
- Scope restreint : le system prompt interdit les réponses hors CV
- Rate limiting : 10 messages/session via `sessionStorage` — au-delà, input désactivé
- Historique : 6 derniers échanges envoyés à chaque requête (`max_tokens: 400`)

### Maintenance

- Toute modification du contenu CV doit être répercutée dans `assets/cv-data.md`
- Le numéro de téléphone n'est PAS dans `cv-data.md` (remplacé par `[disponible sur demande]`)
- Pour tester en local : `vercel dev` + `.env.local` contenant `ANTHROPIC_API_KEY=sk-ant-...`

---

## Déploiement

| Élément | Détail |
|---|---|
| Repository | GitHub — compte phoguet, repo `profil-cv` |
| Hébergement | Vercel (import depuis GitHub) |
| URL cible | `profil-cv.vercel.app` ou domaine personnalisé |
| Déploiement | Automatique à chaque push sur `main` |
| Build | Aucun (HTML statique + fonctions serverless) |
| Variable d'env requise | `ANTHROPIC_API_KEY` dans Vercel Dashboard → Settings → Environment Variables |
