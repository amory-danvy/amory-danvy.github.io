# Animations interactives — Séquence cinématique scroll-scrubbed

> Référence visuelle : ce que **Draftly.space** produit (vidéo cinématique → frames → scroll = balayage des frames).
> Technique utilisée par Apple sur les pages AirPods Max, MacBook Pro.
> Placement : **transition pinned 100vh entre Hero et Projets**.

---

## 1. Vue d'ensemble

L'utilisateur scrolle après le Hero → arrive sur une section pinned 100vh → la vidéo "joue" pendant qu'il continue à scroller (les frames défilent) → une fois la séquence terminée, le scroll continue normalement vers la section Projets.

**Ressenti** : un moment cinématique court (~3-5s de scroll réel) qui démarque le portfolio sans bloquer la navigation.

---

## 2. Pipeline de production

### Étape 1 — Générer la vidéo source avec Veo 3 (via Gemini Advanced)

Aller sur `gemini.google.com`, choisir Veo dans les outils de génération, prompt :

```
Slow cinematic dolly push forward through a dark architectural space.
Brushed steel walls and glass panels catching cool blue light from an
offscreen source, subtle reflections on polished surfaces, single soft
cobalt blue light strip glowing along the ceiling. Camera moves at
constant slow speed (1 meter per second), eye level, locked horizon.
No people, no text, no signage, no logos. Color palette: deep navy
charcoal, brushed steel, single cobalt blue accent. Cinematic 24fps,
anamorphic 2.39:1 framing, slight motion blur, fine film grain.
Industrial minimal aesthetic — NOT sci-fi, NOT cyberpunk, NOT neon.
Closer to: A24 architectural film, Apple product page B-roll.
8 seconds duration.
```

**Variantes à tester** (génère 3-4 versions, garde la plus sobre) :
- Remplacer "architectural space" par "modern glass corridor at dusk"
- Remplacer "dolly push" par "slow vertical crane up alongside a brushed steel facade"
- Remplacer la palette par "deep navy with steel highlights, no other colors"

**À bannir absolument** dans le prompt : `futuristic`, `cyberpunk`, `glow`, `holographic`, `neon`, `sci-fi`, `Tron`, `Blade Runner`. Ces termes basculent Veo vers du visual cliché AI.

### Étape 2 — Plan B si Veo refuse / résultat raté

Free stock cinématique :
- [pexels.com/videos](https://www.pexels.com/videos) — recherches : `architectural blue night`, `steel facade dolly`, `dark corridor camera move`, `glass building night`
- [coverr.co](https://coverr.co) — collection "Architecture" et "Abstract"
- [mixkit.co/free-stock-video](https://mixkit.co/free-stock-video) — section "Architecture"

Critères pour valider une vidéo source :
- Durée 5-10s
- Mouvement caméra **continu** (pas de cuts internes)
- Palette cool/dark (pas de chaud)
- Pas de personnes, pas de texte
- Format 16:9 minimum 1280×720

### Étape 3 — Extraire les frames (ffmpeg local)

Installer ffmpeg si pas déjà fait :
- Windows : `choco install ffmpeg` (avec Chocolatey) OU télécharger sur [ffmpeg.org](https://ffmpeg.org/download.html#build-windows)
- Vérifier : `ffmpeg -version`

Commande d'extraction (depuis la racine du projet, après avoir mis `source.mp4` à la racine).

**Important** : Veo (gratuit/étudiant) ajoute un watermark en bas à droite. La commande ci-dessous rogne 80px en bas pour le supprimer **et** rapproche le ratio du format anamorphique cinéma (~1.92:1) — bonus visuel.

```bash
mkdir -p assets/sequence
ffmpeg -i source.mp4 -vf "crop=iw:ih-80:0:0,fps=24,scale=1280:-1" assets/sequence/frame_%04d.webp
```

**Vérifier d'abord avec une seule frame** avant de générer toute la séquence :

```bash
ffmpeg -i source.mp4 -vf "crop=iw:ih-80:0:0,scale=1280:-1" -frames:v 1 test_crop.webp
```

Ouvre `test_crop.webp`. Si le watermark est encore visible, augmente la valeur (ex : `ih-100`, `ih-120`). Si tu rognes trop, tu perds du sol du couloir.

Ça génère ~120-200 frames `frame_0001.webp` → `frame_0192.webp` dans `assets/sequence/`.

**Taille typique attendue** : 30-50 KB par frame, total 4-8 MB.

Si trop lourd, baisser à `fps=20` ou `scale=960:-1`.

### Bonus visuel — vignette anamorphique CSS

Ajouter sur le canvas pour renforcer le côté cinématique et masquer toute trace résiduelle aux bords :

```css
#sequence-canvas {
  mask-image: radial-gradient(ellipse 100% 100% at center, black 70%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 100% 100% at center, black 70%, transparent 100%);
}
```

### Étape 4 — Compresser en lot (optionnel mais recommandé)

Si chaque frame fait > 50 KB, passer le dossier `assets/sequence/` à [Squoosh CLI](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli) ou simplement [squoosh.app](https://squoosh.app) batch :

```bash
npx @squoosh/cli --webp '{"quality":70}' assets/sequence/*.webp -d assets/sequence/
```

Objectif : total de la séquence ≤ 5 MB.

---

## 3. Implémentation côté site

### HTML (à ajouter entre le Hero et la section Projets)

```html
<section class="cinematic-sequence" aria-hidden="true">
  <div class="sequence-pin">
    <canvas id="sequence-canvas"></canvas>
  </div>
</section>
```

### CSS

```css
.cinematic-sequence {
  /* Hauteur 250vh — donne le "temps de scroll" pour balayer toutes les frames */
  height: 250vh;
  position: relative;
  background: var(--bg);
}

.sequence-pin {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#sequence-canvas {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Mobile : skip la séquence, économise les MB */
@media (max-width: 768px) {
  .cinematic-sequence {
    display: none;
  }
}
```

### JS (vanilla, à mettre dans `script.js`)

```js
// =============================================
// Scroll-scrubbed cinematic sequence
// =============================================

(function initCinematicSequence() {
  const canvas = document.getElementById('sequence-canvas');
  if (!canvas) return;

  // Skip sur mobile (CSS gère l'affichage, on évite le préload)
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const ctx = canvas.getContext('2d');
  const FRAME_COUNT = 192; // ⚠️ Mettre le nombre EXACT de frames générées
  const FRAME_PATH = (i) => `assets/sequence/frame_${String(i).padStart(4, '0')}.webp`;

  const images = [];
  let loadedCount = 0;
  let currentFrame = 0;

  // Préchargement progressif (par batchs de 10 pour ne pas tout charger d'un coup)
  function preloadBatch(start, end) {
    for (let i = start; i <= end && i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        if (i === 1) render(0); // Affiche la première frame dès qu'elle est dispo
      };
      images[i - 1] = img;
    }
  }

  // Resize canvas pour matcher le DPR
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    if (images[currentFrame]) render(currentFrame);
  }

  function render(frameIndex) {
    const img = images[frameIndex];
    if (!img || !img.complete) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Cover : scale l'image pour remplir le canvas
    const scale = Math.max(rect.width / img.width, rect.height / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (rect.width - w) / 2;
    const y = (rect.height - h) / 2;
    ctx.drawImage(img, x, y, w, h);

    currentFrame = frameIndex;
  }

  // Map scroll position → frame index
  function onScroll() {
    const section = document.querySelector('.cinematic-sequence');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Progress de 0 (top of section visible) à 1 (bottom)
    const scrolled = -rect.top;
    const total = sectionHeight - viewportHeight;
    const progress = Math.min(1, Math.max(0, scrolled / total));

    const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
    render(frameIndex);
  }

  // Init
  resizeCanvas();
  preloadBatch(1, 30); // Premiers 30 frames d'abord

  // Charge le reste après que la première soit affichée
  window.addEventListener('load', () => {
    preloadBatch(31, FRAME_COUNT);
  });

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', onScroll, { passive: true });
})();
```

---

## 4. Intégration avec Lenis (smooth scroll)

Si Lenis est déjà actif, l'event `scroll` natif est suffisant — Lenis met à jour `window.scrollY` normalement. Pas besoin d'écouter l'event Lenis spécifique.

Si la séquence saccade sur certains navigateurs, remplacer le listener par :

```js
const lenis = window.lenisInstance; // récupérer ton instance Lenis
lenis.on('scroll', onScroll);
```

---

## 5. Budget de performance

| Métrique | Cible | Pourquoi |
|---|---|---|
| Total séquence | ≤ 5 MB | Au-delà : pénalise mobile et 4G |
| Nombre de frames | 120-200 | Moins = saccade, plus = bande passante inutile |
| Largeur frame | 1280px max | Suffit pour 1440p displays |
| Format frame | WebP qualité 70 | JPG si compatibilité IE legacy (non requis ici) |
| Lighthouse Performance desktop | ≥ 85 | Acceptable pour portfolio dev |
| Lighthouse Performance mobile | ≥ 75 | La séquence est skip mobile, donc pas d'impact |

**Vérifier après build** :
- Tester sur un connexion 4G simulée (Chrome DevTools → Network → Slow 4G)
- Faire un Lighthouse run
- Si > 100 ms de TBT (Total Blocking Time) à cause du décodage canvas, baisser le `FRAME_COUNT`

---

## 6. À NE PAS faire

- Ne pas charger les 200 frames d'un coup au DOM ready : tu bloques le main thread, le LCP plonge
- Ne pas utiliser `<video>` à la place (sur iOS Safari le scrubbing fait des frames noires)
- Ne pas oublier le `aria-hidden="true"` sur la section : c'est purement décoratif, le screen reader doit la skipper
- Ne pas placer cette séquence en hero (le LCP serait catastrophique — le hero doit être texte pur)
- Ne pas générer de séquence > 10s : au-delà, le visiteur perd patience pendant le scroll

---

## 7. Récap pour Claude Code

1. La séquence est entre Hero et Projets, hauteur de section 250vh, canvas pinned 100vh
2. Frames dans `/assets/sequence/`, nommage `frame_NNNN.webp` (4 digits)
3. JS dans `script.js`, classe `cinematic-sequence` sur la section
4. Skip total mobile (`@media max-width: 768px`)
5. Préchargement progressif (30 frames d'abord, puis le reste)
6. Compatible avec Lenis, ScrollTrigger non requis
