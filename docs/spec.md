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
Layout flex : photo gauche (40%) + identité droite (60%).

- **Photo** : grande, `border-radius: 8px`, halo bleu diffus (`box-shadow: 0 0 60px rgba(59,130,246,0.3)`)
- **Nom** : PASCAL HOGUET — Playfair Display 52px blanc bold
- **Séparateur** : ligne fine bleu électrique
- **Titre** : Inter 17px `--accent-muted`, letterspacing 3px, capitales
- **Accroche FR** : "Manager senior expert en transformation numérique et IA — j'accompagne les entreprises publiques et privées dans la création de valeur avec l'intelligence artificielle."
- **Accroche EN** : "Senior manager expert in digital transformation and AI — I help public and private organizations create value with artificial intelligence."
- **Toggle FR/EN** : position absolute top-right, boutons texte, actif en bleu
- **Contact** : icônes SVG + texte `--text-muted` (adresse, tél, email, LinkedIn)

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
