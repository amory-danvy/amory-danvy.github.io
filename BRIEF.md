# Brief de transformation — Portfolio Amory Danvy

> Document à utiliser comme prompt master pour Claude Code (CLI).
> Tout est verrouillé : décisions design, copy, tokens, contraintes.

---

## 1. Contexte projet

- **Type** : Portfolio personnel (BTS SIO SLAM)
- **Brand** : Amory Danvy
- **Tagline** : Développeur en alternance, spécialisé IA agentique.
- **Description (3 phrases)** :
  > Je travaille avec l'IA agentique au quotidien chez Siccardi Tech Leads, dans le cadre de mon alternance BTS SIO SLAM. J'aime construire des outils qui font disparaître des heures de tâches manuelles. Mon terrain de jeu : Python, TypeScript, et tout ce qui peut être automatisé.
- **Audience** :
  - Cible primaire : recruteurs tech (alternance / futur emploi)
  - Cible secondaire : jury BTS SIO SLAM (toutes les sections du référentiel doivent être présentes)
- **Localisation** : Rambouillet, FR
- **Statut actuel** : Recherche alternance (continuité après BTS) / opportunités

---

## 2. Direction esthétique

- **Vibe cible** : **Futuriste sérieux — Acier + bleu nuit**. Sensation IDE / terminal premium, industrielle / aerospace, pas cyberpunk. Le site doit dégager autorité technique et sérieux, pas "tech-bro coloré".
- **Border-radius global** : 8px partout (cohérence stricte)
- **Sites de référence** (screenshots à mettre dans `/refs/`) :
  - **linear.app** — référence canonique de la palette acier + accent bleu. À retenir : système typo, hover states précis, transitions courtes, hiérarchie ferme.
  - **railway.app** — pour la sensation "industrielle navy", l'utilisation de l'accent bleu sur fond charcoal, les cards de produit dense.
  - **vercel.com** — pour la sobriété, le grid strict, le minimalisme tech, le footer clean.

---

## 3. Design tokens (à utiliser EXACTEMENT, dans `:root`)

```css
:root {
  /* Couleurs */
  --bg: #0F1419;          /* deep navy charcoal — JAMAIS pur noir */
  --bg-elevated: #161C24; /* surfaces sur-élevées (cards, modals) */
  --fg: #D4D9DE;          /* steel white — JAMAIS pur blanc */
  --fg-muted: #8A929C;    /* texte secondaire */
  --primary: #4F8FFF;     /* steel blue — accent unique, à doser */
  --primary-glow: #4F8FFF1A; /* halo subtil 10% opacity */
  --border: #1F2733;      /* border discret sur fond sombre */
  --border-strong: #2A3440;

  /* Typo */
  --font-display: 'JetBrains Mono', ui-monospace, monospace;
  --font-body: 'Geist', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Espacement (système 4px) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;

  /* Radius */
  --radius: 8px;
  --radius-sm: 4px;
}
```

**Chargement des fonts** :

```html
<!-- Geist via Vercel CDN ou Fontshare -->
<link href="https://api.fontshare.com/v2/css?f[]=geist@400,500,600&display=swap" rel="stylesheet">
<!-- JetBrains Mono via Fontshare -->
<link href="https://api.fontshare.com/v2/css?f[]=jetbrains-mono@400,500,700,800&display=swap" rel="stylesheet">
```

> Si JetBrains Mono n'est pas dispo sur Fontshare, fallback : CDN officiel JetBrains ou Bunny Fonts. Ne **jamais** utiliser Google Fonts.

---

## 4. Contraintes strictes

### À NE JAMAIS utiliser

- **Inter, Roboto, Poppins, Montserrat** (les tells n°1 d'un site IA-generated)
- FontAwesome ou Lucide → utiliser **Phosphor Icons** ou **Tabler Icons**
- **Dégradés violet→bleu, rose→orange** (le dégradé actuel sur "Danvy" est à supprimer — l'accent est un bleu acier plein, PAS un dégradé)
- shadcn/ui sans personnalisation lourde des tokens
- Palette Tailwind par défaut (`slate-500`, `blue-600`, `gray-800`, etc.) — utiliser EXCLUSIVEMENT les variables CSS
- Tailwind CDN en prod
- Emojis dans l'UI
- **Glassmorphism, blobs flous "AI shapes"** (les 2 cercles violets/bleus floutés du hero actuel sont à supprimer)
- Lorem ipsum (le copy ci-dessous est définitif)
- Dark mode "noir pur #000" — le fond est `--bg: #0F1419`, jamais pur noir
- **Cyberpunk neon, glitch effects, scanlines, grilles vert Matrix** — on est sérieux, pas sci-fi cliché

### Obligatoire

- Variables CSS pour TOUTES les couleurs et espacements
- Au moins UN choix éditorial fort : grille asymétrique, OU typo XL (>120px desktop sur le hero), OU layout qui sort du template SaaS classique
- Animations subtiles : Motion (ex-Framer Motion) avec `ease-out` ou `cubic-bezier(0.16, 1, 0.3, 1)`, 200-400ms max
- Smooth scroll avec **Lenis**
- Mobile-first responsive
- Focus states visibles partout (outline `2px solid var(--primary)` minimum)
- Contrast ratio AA minimum partout (texte sur BG sombre : vérifier sur webaim.org/resources/contrastchecker)
- Code blocks / éléments mono utilisent `--font-mono` (cohérence avec l'identité IDE/terminal)

---

## 5. Sections à construire (ordre d'affichage)

Tout le contenu actuel est à conserver — on **réordonne** pour montrer le travail tôt.

1. **Hero** — Nom (typo XL JetBrains Mono Display, possibilité de jouer avec le mono et un curseur clignotant `_` à la fin). Tagline : "Développeur en alternance, spécialisé IA agentique." Description (3 phrases). 2 CTAs : primaire vers Projets, secondaire vers Contact. **Pas de blob flou. Pas de dégradé. Pas de photo en hero.**
2. **Projets** — En premier après le hero. Les 3 projets actuels :
   - Générateur de CV Dynamique (Python, HTML, CSS) — [GitHub](https://github.com/amory-danvy/Projet1_bts)
   - NewsHunter — Tweet Fetcher (Python, Tweepy, Automation) — [GitHub](https://github.com/amory-danvy/newshunter_twitter/tree/main/NewsHunter2)
   - VintedBoost — IA & Automatisation (Next.js, TypeScript, Tailwind, Gemini Vision, Convex) — Solution privée (utilisera `vintedboost-preview.png`)
3. **À propos** — Texte actuel + photo `photo_amory.png` (à color-grader en steel/cold via Nano Banana, cf. `refs/GEMINI_PROMPTS.md`) + badges (Rambouillet, Recherche Alternance)
4. **Parcours** — Timeline : Apprenti Développeur Siccardi Tech Leads (2024-2026) → BTS SIO SLAM CFA Trajectoire (2024-2026) → Bac Général Lycée Louis-Bascan (2024)
5. **Compétences** — Python, TypeScript, HTML/CSS, JavaScript, PHP, SQL. **Sortir du carré-icône-coloré** (chaque langage avec son propre hex actuellement = bruit visuel). Repenser : grille mono, juste les noms en typo, hover discret, peut-être un niveau de maîtrise.
6. **Veille technologique** — Sujet : Les assistants de codage (IA Générative). 3 articles avec analyses persos (contenu actuel à garder mot pour mot).
7. **Contact** — LinkedIn ([linkedin.com/in/amory-danvy](https://www.linkedin.com/in/amory-danvy/)) + GitHub ([github.com/amory-danvy](https://github.com/amory-danvy)). Repenser : pas besoin de "gros boutons sociaux" — préférer 2 lignes de texte underline avec icône Phosphor à gauche.
8. **Footer** — © 2026 Amory Danvy · BTS SIO SLAM (en font-mono, petit)

---

## 6. Process attendu (de Claude Code)

1. Lire le code existant (`index.html`, `style.css`, `script.js`) et faire un **audit court** (3-5 points) de ce qui ne va pas
2. Proposer **2 directions design distinctes** dans le cadre "acier + bleu nuit" (par ex : "minimal vertical scroll très mono" vs "split asymétrique avec mono numérique en accent")
3. Attendre que je choisisse
4. **Coder section par section**, montrer chaque section avant de passer à la suivante
5. Terminer par une **passe polish** : micro-interactions, hover states, focus states, vérification accessibilité (contrast ratios, focus visible, labels ARIA)

**Premier message attendu : l'audit.**

---

## 7. Stack technique attendue

### ⚠️ Contrainte de déploiement (CRITIQUE)

Le site est déployé via GitHub Pages avec le workflow `.github/workflows/static.yml`, qui fait **UNIQUEMENT** : checkout + upload du repo en l'état + deploy. **Aucune étape de build**.

Conséquence : tout ce qui nécessite `npm install` / compilation / bundling NE FONCTIONNERA PAS, sauf si on commite les fichiers compilés.

### Stack autorisée

- **HTML5 sémantique** (un seul `index.html` à la racine)
- **CSS pur avec variables CSS** dans un `style.css` à la racine — pas Tailwind, pas SCSS, pas de préprocesseur
- **JS vanilla** dans un `script.js` à la racine
- Toutes les dépendances JS/CSS chargées via CDN dans le `<head>` :

```html
<!-- Fonts -->
<link href="https://api.fontshare.com/v2/css?f[]=geist@400,500,600&f[]=jetbrains-mono@400,500,700,800&display=swap" rel="stylesheet">

<!-- Phosphor Icons -->
<script src="https://unpkg.com/@phosphor-icons/web"></script>

<!-- Lenis (smooth scroll) -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>

<!-- Motion (animations) -->
<script src="https://cdn.jsdelivr.net/npm/motion@11.11.13/dist/motion.min.js"></script>
```

### Interdit

- Frameworks (React, Vue, Svelte, Next.js) — pas de build = pas exploitable
- Tailwind compilé (sauf si on commite le CSS final, mais on a dit CSS pur)
- TypeScript (pas de transpilation possible)
- npm scripts requis pour le rendu

### Si une lib CDN n'existe pas

Inline le code minimal nécessaire dans `script.js` ou prend une alternative qui a un CDN.

---

## 8. Visuels

Tous les visuels finaux sont dans `/assets/` (cf. `assets/README.md`). Palette respectée partout : charcoal navy, steel highlights, accent steel-blue.

| Fichier | Usage |
|---|---|
| `assets/portrait-amory.webp` | Section À propos — portrait color-gradé Nano Banana |
| `assets/project-cv.webp` | Card projet "Générateur de CV Dynamique" — plan d'architecte |
| `assets/project-newshunter.webp` | Card projet "NewsHunter" — façade nuit avec fenêtre éclairée |
| `assets/project-vintedboost.webp` | Card projet "VintedBoost" — screenshot réel du produit |
| `assets/veille-ide.webp` | Veille — article "Cursor vs VS Code" — switch mécanique |
| `assets/veille-securite.webp` | Veille — article "Sécurité 40%" — cadenas à combinaison |
| `assets/veille-automatisation.webp` | Veille — article "Automatisation tests" — engrenages |

**Règles d'usage** :
- Le hero ne contient AUCUN visuel — il repose sur la typo JetBrains Mono XL + curseur `_` clignotant.
- Les images projets et veille s'intègrent en cards avec border subtle (`var(--border)`) et un léger `filter: brightness(0.95)` au repos, retiré au hover.
- Le portrait À propos ne dépasse pas 480px de large sur desktop pour éviter qu'il prenne le pas sur le contenu.
- Tous les visuels sont chargés en lazy (`loading="lazy"`) sauf le portrait À propos si visible above-the-fold.
