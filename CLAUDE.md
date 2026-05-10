# CV HTML — Pascal Hoguet

CV personnel au format HTML, bilingue FR/EN, dark theme premium.
Hébergé sur Vercel, versionné sur GitHub (phoguet/profil-cv).

## Stack
- HTML5 / CSS3 / Vanilla JavaScript (aucune dépendance)
- Google Fonts : Playfair Display + Inter
- Déployé sur Vercel (hosting statique)

## Structure
- `index.html` : page principale, tout le contenu FR+EN
- `assets/styles.css` : styles dark theme + @media print
- `assets/main.js` : toggle FR/EN + Intersection Observer animations
- `assets/portrait.png` : photo de profil
- `docs/spec.md` : spécification design et contenu

## Conventions
- Contenu bilingue via `data-lang="fr"` / `data-lang="en"`
- Palette de couleurs dans les CSS custom properties (début de styles.css)
- Pas de framework JS, pas de build step
- Pour tester : ouvrir `index.html` directement dans le navigateur

## Déploiement
- Push sur `main` → déploiement automatique Vercel
- URL : https://profil-cv.vercel.app (ou domaine personnalisé configuré dans Vercel)
