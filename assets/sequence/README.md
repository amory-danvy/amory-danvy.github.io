# /assets/sequence/

Frames de la séquence cinématique scroll-scrubbed (entre Hero et Projets).

## Convention de nommage

```
frame_0001.webp
frame_0002.webp
...
frame_0192.webp
```

- 4 digits, padding zéro
- Extension `.webp` (qualité 70 recommandée)
- Largeur max 1280px (suffit pour 1440p displays)
- Le nombre exact de frames doit matcher la constante `FRAME_COUNT` dans `script.js` (actuellement **192**)

## Comportement si le dossier est vide

Le code dans `script.js` détecte que `frame_0001.webp` retourne 404 et **masque automatiquement la section** (`display: none`). Pas de trou de 250vh dans le scroll, pas d'erreur visible.

Dépose simplement les 192 frames ici et la séquence s'active sans toucher au HTML/CSS/JS.

## Budget perf cible

| Métrique | Cible |
|---|---|
| Total séquence | ≤ 5 MB |
| Nombre de frames | 120 — 200 |
| Largeur frame | 1280px max |
| Format | WebP qualité 70 |

Tester sur Slow 4G simulé après ajout pour valider le LCP.
