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
- **Inter** (Google Fonts, sans-serif) : corps, labels, tags

---

## Sections

### 1. Hero
Layout flex desktop : colonne gauche 42% (photo) + colonne droite flex:1 (identité).

#### Bandeau nom — `.hero-bg-name`
- `position: absolute; top: 48px; left: 0; width: 42%` — centré sur la colonne gauche
- Playfair Display, `clamp(28px, 3.2vw, 48px)`, blanc 92%, fond semi-transparent `rgba(6,11,24,0.55)` + `backdrop-filter: blur(6px)`
- Sur mobile (≤ 900px) : `position: relative`, pleine largeur, centré, sans fond

#### Colonne gauche — `.hero-left`
- `flex: 0 0 42%`
- Photo portrait : `border-radius` via mask-image elliptique, halo bleu `drop-shadow`

#### Colonne droite — `.hero-right`
- `padding: 36px 90px 32px 16px` (90px à droite pour dégager le toggle FR/EN)
- **Titre** : "DIRECTEUR DE PROJET" + "TRANSFORMATION NUMÉRIQUE & INTELLIGENCE ARTIFICIELLE" — Inter 18px, uppercase, letter-spacing 2px, `var(--accent)`
- **Séparateur** : 64px × 2px, dégradé bleu
- **Accroche FR** (3 paragraphes, 14px italic, line-height 1.55) :
  1. "Manager senior spécialisé en transformation numérique et intelligence artificielle, j'accompagne les organisations dans la création de valeur grâce à l'IA et à l'automatisation des processus, avec une approche pragmatique orientée résultats."
  2. "Expert des thématiques territoriales, j'accompagne également les collectivités territoriales et opérateurs privés dans les programmes de territoire intelligent et durable."
  3. "Mon objectif : Mener des projets à impact et faire de chaque projet IA un levier de création de valeur mesurable."
- **Accroche EN** : même structure en anglais
- **Stats** : 2 blocs — 35+ ans d'expérience · 50+ projets pilotés (Playfair 32px)
- **Poste actuel** : badge "Actuellement en poste chez Onepoint" + liste 2 rôles :
  - Head of Roadmap AI for Consulting — programme Elio
  - Direction de projet, conseil et expertise Territoires Connectés et Durables
- **Tags secteurs** (4) : Secteur privé & secteur public · Data & IA · Plateformes agentiques & automatisation · Smart city & smart building
- **Bouton CTA** : "Me contacter" / "Contact me" → `mailto:phoguet@protonmail.com`
- **Contact** : icônes SVG — tél, email, LinkedIn (gap 28px)
- **Toggle FR/EN** : `position: fixed; top: 56px; right: 32px; z-index: 100`

### 2. Profil + Compétences
Layout 2 colonnes 60/40, fond `--bg-section`.

**Profil** : texte descriptif, mots-clés en `--accent-muted`.

**Compétences FR** : tags pills — Pilotage opérationnel · Direction de projet · Transformation numérique · IA & Data · Territoires intelligents · Numérique responsable · Delivery agile · Développement commercial

**Compétences EN** : Operational Management · Project Direction · Digital Transformation · AI & Data · Smart Territories · Responsible Digital · Agile Delivery · Business Development

### 3. Expériences
Timeline verticale : `border-left: 2px solid var(--timeline-line)`, points lumineux bleus.

**Entrées détaillées** (avec bullets et réalisations) :
- Onepoint (depuis 2019) : Head of Roadmap AI for Consulting + Directeur de projet Territoires intelligents
- École des Ponts ParisTech (2019-2026) : Enseignant mastère AMUR & IBD
- Capgemini Nantes (2013-2019) : Directeur Centre d'Excellence + Directeur Lab'Innovation
- ADEUZA/Sopra Group (2009-2013) : Directeur de production

**Entrées condensées** (poste + 1 ligne) :
- AIS Ouest (2005-2009) : Directeur des opérations
- UNILOG (1996-2005) : Directeur BU ECM, Directeur commercial, Chef de projet
- ALCATEL TITN ANSWARE (1993-1995) : Chargé de projet
- ICL France / ICL Europe (1990-1993) : Ingénieur études et développement

### 4. Formation + Centres d'intérêts + Contact
Layout 3 colonnes égales, fond `--bg-medium`.

- **Formation** : Ingénieur ISEN (Lille 1989) · Anglais courant · Certification INR
- **Centres d'intérêts** : 6 icônes SVG line art + label (grille 2×3)
- **Contact** : 14 route de Chambord 41350 Huisseau-sur-Cosson · +33 6 46 20 55 26 · phoguet@protonmail.com · LinkedIn

### 5. Footer
`© Pascal Hoguet · 2026`, centré, `--text-muted` 12px.

---

## Internationalisation

**Stratégie** : attributs `data-lang="fr"` / `data-lang="en"` sur chaque élément de contenu. Le JavaScript switche `display` sur clic du toggle. Par défaut : français visible.

**Print** : toujours en français (contenu EN masqué en `@media print`).

---

## Animations

**Intersection Observer API** : classe `.reveal` sur chaque section et entrée timeline. À l'entrée dans le viewport : `.reveal.visible` → `opacity 0→1`, `translateY 20px→0`, `transition: 0.5s ease`. Délais échelonnés (`transition-delay`) sur les enfants directs.

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
- Contenu EN masqué (impression en FR uniquement)

---

## Déploiement

| Élément | Détail |
|---|---|
| Repository | GitHub — compte phoguet, repo `profil-cv` |
| Hébergement | Vercel (import depuis GitHub) |
| URL cible | `profil-cv.vercel.app` ou domaine personnalisé |
| Déploiement | Automatique à chaque push sur `main` |
| Build | Aucun (HTML statique pur) |
