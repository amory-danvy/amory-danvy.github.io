# Prompts visuels pour Gemini / Imagen / Nano Banana

> Direction : **Acier + bleu nuit** — futuriste sérieux, industrielle/architecturale, PAS cyberpunk.
> Palette à respecter : BG #0F1419 (deep navy charcoal), FG #D4D9DE (steel white), accent #4F8FFF (steel blue).
> Stratégie principale : **pas de visuels d'ambiance générés par IA**. Tout repose sur la typo + screenshots + ta photo color-gradée.

---

## 0. Recommandation principale

Pour ton portfolio (acier + bleu nuit, dev IA agentique, audience recruteurs/jury BTS), le choix le plus pro est **zéro visuel généré par IA**. Pourquoi :

- JetBrains Mono Display + Geist sur fond `#0F1419` font tout le travail visuel.
- Pour les recruteurs tech, un site sobre = signal de sérieux. Linear, Vercel, Anthropic n'ont quasi aucun visuel d'ambiance.
- Le seul "visuel" indispensable est ta photo (À propos), qu'on travaille via Nano Banana en color grade — pas en génération.
- Les screenshots réels de tes projets (vintedboost-preview.png déjà existant) ont infiniment plus de valeur qu'un visuel IA.

**Si tu suis cette voie, va directement à la section §1 (Nano Banana pour la photo). Le reste est en backup.**

---

## 1. Photo "À propos" — color grade Nano Banana (PRIORITÉ)

Charge `photo_amory.png` dans Gemini avec ce prompt :

```
Edit this portrait photograph to match a cold cinematic editorial color grade. Apply: deep teal-charcoal shadows shifting toward navy, steel-cool midtones, slight desaturation across all colors, subtle blue tint in the highlights, precise sharpening on facial features. The final look should match the aesthetic of a Linear / Vercel / Anthropic team page: serious, technical, confident, with cold blue undertones. Preserve face proportions, expression, and details exactly. Background should shift to a desaturated cool tone. Light film grain optional. Do not add or change clothing, hair, or facial features.
```

**Résultat attendu** : ta photo conserve son authenticité (vrai portrait), mais s'intègre visuellement dans la palette du site.

Génère 3-4 variantes, garde la plus cohérente.

---

## 2. (Backup) Si tu veux remplacer les Unsplash des projets Générateur CV / NewsHunter

Idéal : prendre des **vrais screenshots** de ces projets. Si vraiment impossible, prompts architecturaux ci-dessous (style "couverture Wired" / "Anthropic blog cover", pas tech-cliché).

### 2A. Générateur CV — cover (architectural minimal)

```
Macro photograph of a single sheet of dark navy paper on a brushed steel surface, lit by a sharp directional light from the upper left creating crisp shadows and a thin highlight on the paper edge. Slightly elevated from the surface, casting a precise shadow. Shot on Hasselblad H6D, sharp focus throughout, no grain. Industrial editorial style, monochromatic dark blue-charcoal palette, single subtle steel-blue highlight. Composition leaves negative space for overlay. No text, no logos, no people. Wired magazine cover aesthetic.
```

### 2B. NewsHunter — cover (architectural minimal)

```
Architectural macro photograph of vertical glass and steel building facade at night, reflecting deep navy sky, single illuminated window in the upper-right with cool blue light spilling out. Sharp geometric lines, brutalist composition. Shot on Hasselblad H6D, ultra sharp, deep depth of field, monochromatic deep blue-charcoal palette. Editorial architecture magazine style (Dezeen, Wallpaper). Calm, precise, serious. No people, no text, no signage.
```

### 2C. (Optionnel) Générateur CV — alternative B&W technique

```
Overhead macro photograph of an architectural blueprint on dark steel surface, partial unfolded, showing precise technical lines in pale cyan ink. Single drafting pencil resting diagonally. Sharp directional light from the side. Shot on Phase One IQ4, ultra-detailed, no grain. Monochromatic deep navy-charcoal palette, cold blueprint cyan accent. Architectural editorial style, no text legible, no logos. Aerospace technical drawing aesthetic.
```

---

## 3. (Backup) Section "Veille" — accents discrets

À générer SEULEMENT si tu trouves la section trop austère. Sinon, skip.

### 3A. Accent IDE (article Cursor)

```
Macro close-up photograph of a single mechanical keyboard switch with steel housing and dark grey keycap, lit from above with cool directional light, deep shadow underneath. Shot on Phase One IQ4, ultra-detailed, no grain. Monochromatic charcoal-steel palette with subtle blue reflection on the metal. Industrial product photography style, no text, no logos.
```

### 3B. Accent sécurité

```
Macro photograph of a chrome combination lock against deep navy charcoal background, sharp directional light from the left creating crisp highlights on the metal grooves and a hard shadow on the right. Shot on Hasselblad H6D, ultra-sharp, monochromatic cool palette with steel-blue highlights. Editorial industrial style, no text, no logos, no context.
```

### 3C. Accent automatisation

```
Macro photograph of precision metal gears interlocking on a dark steel surface, sharp top-down lighting creating geometric shadows. Shot on Phase One IQ4, deep depth of field, no grain. Monochromatic charcoal palette with cool steel highlights. Industrial archival photography style, single subtle blue light reflection. No text, no logos, no people.
```

---

## 4. À BANNIR — mots qui cassent immédiatement le résultat

### Cliché AI général
- futuristic, cyberpunk, sci-fi, hi-tech
- AI, neural, holographic, virtual reality
- 3D render, octane render, unreal engine, blender
- ultra detailed, hyper detailed, 8K, 4K, masterpiece
- vibrant, vivid, oversaturated, neon
- glossy, polished, perfect, pristine
- trending on artstation, award winning

### Cliché dark/tech spécifique
- glow, glowing, luminescent
- matrix code, binary rain, scanlines, glitch
- circuit board pattern, neural network visualization
- purple+pink gradient, cyan+magenta
- spotlight, lens flare, god rays
- "Tron", "Blade Runner" (déclenchent du néon)

### Negative prompt (Google AI Studio uniquement)

```
3D render, digital art, illustration, cartoon, anime, vector, glossy, neon glow, cyberpunk, futuristic, glitch, scanlines, matrix code, oversaturated, vibrant colors, purple gradient, pink, magenta, cyan glow, ultra detailed, 8K, masterpiece, watermark, signature, text overlay, lens flare, godrays, sci-fi
```

---

## 5. Modificateurs qui marchent (à mixer)

### Cameras / film (équivalent "studio premium")
- Hasselblad H6D, Phase One IQ4 (ultra-précis, médium format pro)
- Leica SL3, Mamiya 7 (sharp et architectural)
- Pas de "Portra 400" ici (trop chaud) — privilégier "Cinestill 800T" pour les nuits, ou pas de référence film du tout pour rester clinique

### Lighting
- sharp directional light from the left/upper-left (industriel)
- cool directional light, single source, hard shadow
- moonlight, ambient blue tone (pour les architectural night shots)
- top-down lighting, geometric shadow (flat-lay tech)
- éviter "warm", "golden hour", "soft natural light" (basculent en chaud)

### Style
- editorial, industrial, architectural, archival
- Wired magazine, Dezeen, Wallpaper, Anthropic blog cover
- monochromatic, charcoal palette, steel blue accent
- macro, close-up, sharp focus, no grain

### Palette
- monochromatic deep navy-charcoal palette
- cool steel highlights, subtle blue reflection
- desaturated, matte, cinematic cold grade
- éviter "warm", "earth tones", "cream" (chaud)

---

## 6. Workflow recommandé

1. **Priorité absolue** : passer `photo_amory.png` dans Nano Banana (§1). C'est le seul visuel qui change vraiment le rendu.
2. **Second** : essayer de capturer des screenshots réels de Générateur CV et NewsHunter (UI, code, terminal — n'importe quoi de vrai bat l'IA).
3. **Si vraiment impossible** : générer 3 versions de §2A et §2B, garder la plus sobre.
4. **Skip §3** sauf si la section Veille te paraît visuellement vide une fois en place.
5. Compresser les retenues sur [squoosh.app](https://squoosh.app) en WebP, 80% qualité, max 1600px de largeur.
6. Placer dans `D:\projects BTS\portfolio\assets\` (à créer).
7. Renommer proprement : `portrait-amory.webp`, `project-cv.webp`, `project-newshunter.webp`.

---

## 7. Plan B 100% gratuit, 100% pro

Si Imagen via Gemini ne donne pas ce que tu veux :

- **Unsplash.com** avec recherches : "brutalist architecture", "steel facade night", "navy minimal", "industrial macro", "blueprint drafting". Photos réelles, libres de droits, souvent meilleures que l'IA pour cet exact style.
- **Pexels.com** : alternative à Unsplash, même esprit.

Pour un portfolio dev : **2 vraies photos Unsplash bien choisies + ta photo color-gradée + tes screenshots = mieux qu'un site bourré de visuels IA**. Sincèrement.

---

## 8. Récap décisions visuelles

| Élément | Décision |
|---|---|
| Hero | **Pas de visuel.** JetBrains Mono Display XL + curseur `_` clignotant. |
| Projets | Vrais screenshots ; backup §2 si impossible. |
| À propos | `photo_amory.png` color-gradée Nano Banana (§1). **À faire en priorité.** |
| Parcours | Pas de visuel. Timeline en typo. |
| Compétences | Pas de visuel. Grille mono des noms. |
| Veille | Pas de visuel par défaut. §3 si vraiment vide. |
| Contact | Pas de visuel. 2 lignes underline + icône Phosphor. |
| Footer | Pas de visuel. Mono petit. |
