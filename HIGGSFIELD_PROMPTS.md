# Prompts Higgsfield — Portfolio Amory Danvy

Tous les prompts sont calibrés sur la palette off-white #FAFAF7 + terracotta #BC4B26 + earth tones, et la vibe **moderne tech / éditorial documentaire**.

**Règle d'or** : génère 3 fois chaque prompt en variant la pellicule, l'appareil ou la lumière. Tu trieras ensuite. Ne prends jamais le premier rendu.

---

## 1. Portrait éditorial — Section "À propos"

> Remplace la photo type LinkedIn. Look magazine *Kinfolk* / *Cereal*.

```
young man in his late teens working at a wooden desk near a large window,
shot on Portra 400, soft window light from the left, candid composition,
slight motion blur on hands, wearing a plain off-white sweater,
muted earth tones, terracotta and cream palette, slight grain,
shallow depth of field, editorial documentary style, eye level
```

---

## 2. Hero ambiance — Desk overhead (optionnel)

> Remplace les "blobs flous AI shapes". À utiliser comme bande horizontale ou en demi-écran à côté du hero text.

```
overhead flat-lay of a minimal wooden desk, open notebook with handwritten notes,
mechanical pencil, vintage Contax T2 camera, ceramic mug with terracotta glaze,
folded linen napkin, soft overcast natural light, shot on Hasselblad 500c,
muted cream and rust palette, matte finish, slight film grain, editorial composition
```

---

## 3. Projet "Générateur de CV"

> Remplace le placeholder Unsplash. Évoque le PDF/CV de façon tactile, pas un dashboard.

```
close-up of a printed CV document on a wooden desk, fountain pen resting on paper,
soft window light from the side, paper texture visible, slight shadow,
shot on Leica M6 with Portra 400, muted beige and ink palette,
candid still life, shallow depth of field, editorial style, no text legible
```

---

## 4. Projet "NewsHunter — Tweet Fetcher"

> Remplace le placeholder Unsplash. Évoque la veille / scraping sans cliché tech.

```
side angle of a smartphone on a marble desk showing an out-of-focus feed of news cards,
morning light streaming through a window, ceramic coffee cup in foreground,
shot on Contax T2 with Kodak Gold 200, muted earth tones, candid morning scene,
shallow depth of field, slight grain, editorial lifestyle photography
```

---

## 5. Projet "VintedBoost — IA & Automatisation"

> Complément ou remplacement de `vintedboost-preview.png`. Le terracotta accent sur un vêtement = rappel discret du primary color.

```
neatly folded linen and cotton garments stacked on a wooden surface,
smartphone resting on top showing a soft-focus product listing,
soft natural daylight, shot on Pentax 67 with Portra 400,
muted neutral palette with one terracotta accent garment,
candid still life, slight grain, editorial e-commerce style, no text legible
```

---

## 6. Cover section "Veille technologique"

> Bandeau de section ou fond subtil. Évite le "écran avec articles".

```
hands holding an open paperback book, kraft paper bookmark, blurred wooden table,
soft overcast window light, shot on Mamiya 7 with Kodak Portra 160,
muted sepia and cream palette, slight grain, candid documentary style,
shallow depth of field, no text legible
```

---

## Modificateurs à varier (pour tes 3 essais par prompt)

| Variable | Options |
|---|---|
| Pellicule | Portra 400 → Portra 160 → Kodak Gold 200 → Fuji Pro 400H |
| Appareil | Leica M6 → Contax T2 → Hasselblad 500c → Mamiya 7 → Pentax 67 |
| Lumière | natural window light → overcast soft light → golden hour → soft side light |
| Style | editorial → documentary → lifestyle → candid still life |

---

## À NE JAMAIS rajouter

Même si Higgsfield le suggère en preset :

- "ultra detailed"
- "8K" / "4K" / "high resolution"
- "masterpiece"
- "trending on artstation"
- "vibrant colors"
- "digital art" / "concept art"
- "sharp focus" → préférer "shallow depth of field"
- "photorealistic" → redondant avec le nom de la pellicule
- "AI generated" / "futuristic" / "cyberpunk"
- "octane render" / "unreal engine"

Si un visuel a un *feel* "trop parfait" / "trop net" / "trop saturé", c'est qu'un de ces mots a sneak-in. Re-génère.

---

## Workflow recommandé

1. Lance les 6 prompts en série, 3 essais chacun = 18 visuels au total.
2. Tri sévère : ne garde que ce qui évoque vraiment le sujet sans cliché.
3. Compresse les retenus avec [squoosh.app](https://squoosh.app) (WebP, qualité 80, max 1600px de large).
4. Range dans `D:\projects BTS\portfolio\assets\` :
   - `assets/portrait-amory.jpg`
   - `assets/desk-hero.jpg` (si retenu)
   - `assets/project-cv.jpg`
   - `assets/project-newshunter.jpg`
   - `assets/project-vintedboost.jpg`
   - `assets/veille-cover.jpg`
5. Claude Code pourra référencer ces chemins lors du build.
