# PDF Export Button — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter un bouton flottant fixe (bottom-right, au-dessus du chatbot) qui déclenche `window.print()` pour exporter le CV en PDF, bilingue FR/EN, masqué à l'impression.

**Architecture:** Bouton `#pdf-export-btn` fixe dans le DOM, stylé via CSS, géré par un écouteur d'événement dans `main.js`. Le toggle FR/EN existant (via `data-lang`) gère automatiquement le label bilingue sans modification de `setLang()`.

**Tech Stack:** HTML5, CSS3, Vanilla JS — aucune dépendance.

---

## Fichiers modifiés

| Fichier | Rôle |
|---|---|
| `index.html` (ligne ~528) | Ajout du bouton `#pdf-export-btn` après `#chat-toggle` |
| `assets/styles.css` (ligne ~960) | Styles du bouton + règle `@media print` |
| `assets/main.js` (fin du IIFE) | Gestionnaire `click` → `window.print()` |

---

## Task 1 : HTML — bouton PDF

**Fichiers :**
- Modifier : `index.html:524-528`

- [ ] **Ajouter le bouton après `#chat-toggle`**

Ouvrir `index.html`. Après la ligne 528 (`</button>` fermant `#chat-toggle`), insérer :

```html
  <!-- ==================== PDF EXPORT ==================== -->
  <button id="pdf-export-btn" aria-label="Exporter PDF / Export PDF">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="9" y1="13" x2="15" y2="13"></line>
      <line x1="9" y1="17" x2="15" y2="17"></line>
    </svg>
    <span data-lang="fr">Exporter PDF</span>
    <span data-lang="en" style="display:none">Export PDF</span>
  </button>
```

- [ ] **Vérifier dans le navigateur**

Ouvrir `index.html` dans un navigateur (ou `vercel dev`). Le bouton doit apparaître dans le DOM (visible ou non, selon que le CSS est déjà ajouté).

---

## Task 2 : CSS — styles du bouton

**Fichiers :**
- Modifier : `assets/styles.css` (section chatbot, après la ligne ~985)

- [ ] **Ajouter les styles du bouton PDF après le bloc `#chat-toggle:hover`**

Dans `assets/styles.css`, après le bloc `#chat-toggle:hover { ... }` (ligne ~985), insérer :

```css
#pdf-export-btn {
  position: fixed;
  bottom: 88px;
  right: 24px;
  z-index: 150;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: none;
  border-radius: 50px;
  background: var(--accent);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  transition: filter 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
}

#pdf-export-btn:hover {
  filter: brightness(1.15);
  box-shadow: 0 0 28px rgba(59, 130, 246, 0.7);
}
```

- [ ] **Ajouter la règle `@media print`**

Trouver le bloc `@media print` dans `assets/styles.css` (chercher `@media print`). À l'intérieur, ajouter :

```css
#pdf-export-btn { display: none !important; }
```

- [ ] **Vérifier visuellement**

Recharger le navigateur. Le bouton doit apparaître en bas à droite, au-dessus du bouton chatbot, avec le label "Exporter PDF". Vérifier aussi en mode EN (toggle) : le label doit passer à "Export PDF".

---

## Task 3 : JS — gestionnaire de clic

**Fichiers :**
- Modifier : `assets/main.js` (fin du IIFE, avant le `})();` de fermeture)

- [ ] **Trouver la fin du IIFE dans `main.js`**

Le fichier se termine par `})();`. Ajouter juste avant cette ligne fermante :

```js
  /* ---- PDF export ---- */
  document.getElementById('pdf-export-btn').addEventListener('click', () => {
    window.print();
  });
```

- [ ] **Tester le comportement**

Recharger le navigateur. Cliquer sur "Exporter PDF". La boîte de dialogue d'impression du navigateur doit s'ouvrir. Choisir "Enregistrer en PDF" : le PDF généré doit avoir un fond blanc, texte noir, contenu en français, sans le bouton PDF ni le chatbot visibles.

---

## Task 4 : Commit et push

- [ ] **Vérifier les fichiers modifiés**

```bash
git diff --stat
```

Résultat attendu : 3 fichiers modifiés (`index.html`, `assets/styles.css`, `assets/main.js`).

- [ ] **Commiter et pousser**

```bash
git add index.html assets/styles.css assets/main.js
git commit -m "feat: bouton export PDF flottant (window.print)"
git push
```

Vercel déploie automatiquement depuis `main`.
