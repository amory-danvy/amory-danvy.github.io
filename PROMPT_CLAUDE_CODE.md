# Prompt master à coller dans Claude Code

Copie-colle ce qui suit (entre les triples backticks) directement dans Claude Code, à la racine du projet.

---

```
Je veux transformer mon site existant pour qu'il ait un look pro et distinctif, sans le feel "généré par IA". Toutes les décisions design et le copy sont déjà verrouillés dans BRIEF.md à la racine — lis-le AVANT toute autre action, c'est ta source de vérité.

CONTEXTE
- Type : Portfolio personnel BTS SIO SLAM
- Brand : Amory Danvy
- Tagline : "Développeur en alternance, spécialisé IA agentique."
- Audience primaire : recruteurs tech (alternance / emploi)
- Audience secondaire : jury BTS SIO SLAM (toutes les sections du référentiel sont obligatoires)

DIRECTION ESTHÉTIQUE
- Vibe : Futuriste sérieux — Acier + bleu nuit. Sensation IDE / terminal premium, industrielle / aerospace. PAS cyberpunk neon, PAS sci-fi cliché.
- Sites de référence (screenshots dans /refs/) :
  * linear.app — pour le système typo, les hover states précis, les transitions courtes, la hiérarchie ferme
  * railway.app — pour la sensation industrielle navy, l'utilisation de l'accent bleu sur fond charcoal
  * vercel.com — pour la sobriété, le grid strict, le minimalisme tech, le footer clean

DESIGN TOKENS (à utiliser EXACTEMENT, dans :root)
--bg: #0F1419 (deep navy charcoal — JAMAIS pur noir)
--bg-elevated: #161C24 (surfaces sur-élevées)
--fg: #D4D9DE (steel white — JAMAIS pur blanc)
--fg-muted: #8A929C
--primary: #4F8FFF (steel blue — accent unique, plein, JAMAIS en dégradé)
--border: #1F2733
--border-strong: #2A3440
--font-display: 'JetBrains Mono', ui-monospace, monospace
--font-body: 'Geist', system-ui, sans-serif
--font-mono: 'JetBrains Mono', ui-monospace, monospace
--radius: 8px

Espacement : système 4px (4, 8, 12, 16, 24, 32, 48, 64, 96, 128)
Fonts : charger via Fontshare CDN, PAS Google Fonts

CONTRAINTES STRICTES — ne JAMAIS utiliser
- Inter, Roboto, Poppins, Montserrat
- FontAwesome ou Lucide → utiliser Phosphor Icons
- Dégradés violet→bleu (le dégradé actuel sur "Danvy" est à supprimer — l'accent est un bleu acier PLEIN, pas un dégradé)
- Blobs flous "AI shapes" (les 2 cercles violets/bleus du hero actuel sont à supprimer)
- shadcn/ui sans personnalisation lourde
- Palette Tailwind par défaut (slate-500, gray-800, blue-600, etc.) — utiliser exclusivement les variables CSS
- Tailwind CDN en prod
- Emojis dans l'UI
- Lorem ipsum (le copy de BRIEF.md est définitif)
- Cyberpunk neon, glitch effects, scanlines, grilles vert Matrix
- Pur noir #000 ou pur blanc #FFF — toujours utiliser --bg et --fg

OBLIGATOIRE
- Variables CSS pour TOUTES les couleurs et espacements
- Au moins UN choix éditorial fort (grille asymétrique OU typo XL >120px hero OU layout non-template). Idée forte : utiliser JetBrains Mono pour le hero avec un curseur clignotant `_` à la fin du nom.
- Animations subtiles : Motion (ex-Framer Motion), ease-out ou cubic-bezier(0.16, 1, 0.3, 1), 200-400ms max
- Smooth scroll avec Lenis
- Mobile-first responsive
- Focus states visibles : outline 2px solid var(--primary) minimum
- Contrast ratio AA minimum (vérifier webaim contrast checker)
- Phosphor Icons via @phosphor-icons/web (pas de FontAwesome)

CONTRAINTE CRITIQUE — DÉPLOIEMENT GITHUB PAGES
Le site est déployé via .github/workflows/static.yml qui ne fait AUCUN build : il upload le repo en l'état. Donc :
- HTML/CSS/JS purs uniquement (un index.html, un style.css, un script.js à la racine)
- Pas de Tailwind compilé, pas de SCSS, pas de TypeScript, pas de bundler, pas de framework
- Toutes les dépendances chargées via CDN dans le <head> :
  * Fonts via Fontshare CDN
  * Phosphor Icons via unpkg (https://unpkg.com/@phosphor-icons/web)
  * Lenis via jsDelivr (https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js)
  * Motion via jsDelivr (https://cdn.jsdelivr.net/npm/motion@11.11.13/dist/motion.min.js)
- Si tu as besoin d'une lib qui n'a pas de CDN, inline le code minimal dans script.js OU prends une alternative

VISUELS (tous dans /assets/, palette acier + bleu nuit respectée)
- /assets/portrait-amory.webp : portrait color-gradé pour À propos
- /assets/project-cv.webp : plan d'architecte pour la card "Générateur de CV"
- /assets/project-newshunter.webp : façade verre/nuit pour la card "NewsHunter"
- /assets/project-vintedboost.webp : screenshot réel pour la card "VintedBoost"
- /assets/veille-ide.webp : switch mécanique pour l'article "Cursor vs VS Code"
- /assets/veille-securite.webp : cadenas à combinaison pour l'article "Sécurité 40%"
- /assets/veille-automatisation.webp : engrenages pour l'article "Automatisation tests"

Règles d'usage des visuels :
- Hero : AUCUN visuel — repose sur la typo JetBrains Mono XL + curseur `_` clignotant
- Cards (projets, veille) : border subtle var(--border), filter: brightness(0.95) au repos, retiré au hover, transition 300ms
- Portrait À propos : max-width 480px sur desktop, ne doit pas dominer le contenu
- Loading : lazy partout sauf portrait À propos si visible above-the-fold

SECTIONS (ordre d'affichage)
1. Hero — nom en JetBrains Mono XL (>120px desktop) avec curseur `_` clignotant, tagline, description, 2 CTAs (Projets + Contact). Pas de blob flou. Pas de dégradé. Pas de photo.
2. Projets — 3 projets : Générateur CV, NewsHunter, VintedBoost (cf. BRIEF.md pour les détails et liens GitHub)
3. À propos — texte actuel + photo_amory.png color-gradée + badges (Rambouillet, Recherche Alternance)
4. Parcours — timeline : Siccardi Tech Leads → BTS SIO SLAM → Bac
5. Compétences — Python, TypeScript, HTML/CSS, JavaScript, PHP, SQL. SORTIR du carré-icône-coloré actuel (un hex différent par langage = bruit visuel). Repenser : grille mono, noms en typo, hover discret.
6. Veille techno — Les assistants de codage IA, 3 articles avec analyses persos (contenu actuel à garder mot pour mot)
7. Contact — LinkedIn + GitHub. Pas de gros boutons sociaux. Préférer 2 lignes de texte underline avec icône Phosphor à gauche.
8. Footer — © 2026 Amory Danvy · BTS SIO SLAM (en font-mono, petit)

PROCESS QUE JE VEUX
1. D'abord, lis BRIEF.md ET le code existant (index.html, style.css, script.js), puis fais un audit court (3-5 points) de ce qui ne va pas
2. Propose-moi 2 directions design distinctes dans le cadre acier + bleu nuit (décris le moodboard, ne code pas encore) — par exemple "minimal vertical scroll très mono" vs "split asymétrique avec mono numérique en accent"
3. Attends que je choisisse
4. Code section par section, montre-moi chaque section avant de passer à la suivante
5. Termine par une passe polish : micro-interactions, hover states, focus states, accessibilité (contrast ratios, focus visible, labels ARIA)

Commence par l'audit.
```

---

## Notes

- Le `BRIEF.md` à la racine est ta source de vérité — il contient tout en détail.
- Les screenshots dans `/refs/` sont à mettre AVANT de lancer Claude Code (cf. `refs/README.md`).
- Le `photo_amory.png` et `vintedboost-preview.png` sont déjà présents à la racine — laisse Claude Code les déplacer dans `/assets/` ou les réutiliser tels quels.
- Pour la photo : passe-la dans Nano Banana avec le prompt fourni dans `refs/GEMINI_PROMPTS.md` AVANT le build, pour qu'elle match la palette steel/cold.
