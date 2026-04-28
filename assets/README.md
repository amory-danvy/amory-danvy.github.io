# /assets/

Dossier où mettre tous les visuels finaux du site. Claude Code lira ce dossier pendant le build.

## Étapes

1. **Sauvegarder les 6 images** générées via Gemini (clic droit → enregistrer sur les images du chat Cowork, ou capture d'écran si pas dispo).
2. **Compresser** chacune sur [squoosh.app](https://squoosh.app) :
   - Format : WebP
   - Qualité : 80%
   - Largeur max : 1600px (1200px suffit pour les cards projets/veille)
3. **Renommer** selon le tableau ci-dessous et déposer ici.

## Fichiers attendus

| Fichier | Source | Usage |
|---|---|---|
| `portrait-amory.webp` | Image #5 (portrait color-gradé Nano Banana) | Section À propos |
| `project-cv.webp` | Image #3 (plan d'architecte) | Card projet "Générateur de CV" |
| `project-newshunter.webp` | Image #4 (façade nuit) | Card projet "NewsHunter" |
| `project-vintedboost.webp` | Convertir `vintedboost-preview.png` (à la racine) en WebP | Card projet "VintedBoost" |
| `veille-ide.webp` | Image #2 (switch mécanique) | Veille — article Cursor vs VS Code |
| `veille-securite.webp` | Image #1 (cadenas à combinaison) | Veille — article Sécurité 40% |
| `veille-automatisation.webp` | Image #6 (engrenages) | Veille — article AI Agents tests |

## Note

- `photo_amory.png` (à la racine) reste utile comme fichier source — ne le supprime pas, mais il ne sera plus affiché sur le site.
- `vintedboost-preview.png` (à la racine) doit aussi être converti en WebP et déplacé ici.
