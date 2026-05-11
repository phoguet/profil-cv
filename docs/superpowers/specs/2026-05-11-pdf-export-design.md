# Design — Bouton export PDF

**Date :** 2026-05-11
**Projet :** CV HTML Pascal Hoguet

---

## Objectif

Ajouter un bouton flottant permettant d'exporter le CV complet au format PDF depuis le navigateur, sans dépendance externe.

---

## Approche retenue

**`window.print()` natif** — Le bouton déclenche l'impression native du navigateur. L'utilisateur choisit « Enregistrer en PDF » dans la boîte de dialogue système.

Justification : le `@media print` est déjà configuré (fond blanc, texte noir, FR uniquement, animations masquées, canvas et barre de progression cachés). Zéro dépendance, cohérent avec la philosophie du projet.

---

## Composant bouton

### Position

Bouton fixe `position: fixed`, empilé **au-dessus** du widget chatbot :
- `bottom: 90px` (chatbot est à `bottom: 24px`, hauteur ~52px + gap)
- `right: 24px`
- `z-index: 150` (entre le toggle FR/EN à 100 et le chatbot à 200 — les trois éléments ne se chevauchent pas)

### Apparence

- Fond `var(--accent)` (#3B82F6), identique au bouton chatbot
- Icône SVG document/PDF (line art, 16×16) + label texte
- `border-radius: 50px`, `padding: 10px 18px`, `font-size: 13px`, `font-weight: 600`
- `box-shadow` bleu identique au chatbot toggle
- Hover : `brightness(1.15)`, transition 0.2s
- Masqué à l'impression (`@media print { display: none }`)

### Label bilingue

- FR : « Exporter PDF »
- EN : « Export PDF »

Deux `<span>` avec `data-lang="fr"` / `data-lang="en"`, cohérent avec le système de toggle existant.

---

## Comportement

1. Clic → `window.print()`
2. Le navigateur ouvre sa boîte de dialogue impression/PDF
3. Le `@media print` masque le bouton PDF, le chatbot, le toggle langue, le canvas, la barre de progression
4. Le contenu est rendu en FR (les éléments `data-lang="en"` sont déjà masqués en `@media print`)

---

## Modifications fichiers

| Fichier | Modification |
|---|---|
| `index.html` | Ajout du bouton `#pdf-export-btn` (fixe, bottom-right) |
| `assets/styles.css` | Styles du bouton + règle `@media print { #pdf-export-btn { display: none } }` |
| `assets/main.js` | Gestionnaire `click` → `window.print()` + mise à jour label au toggle FR/EN |

---

## Hors périmètre

- Nommage automatique du fichier PDF (géré par le navigateur)
- Génération côté serveur
- Bibliothèque JS tierce
