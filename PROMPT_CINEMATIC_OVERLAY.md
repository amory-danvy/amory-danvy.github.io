# Prompt Claude Code — Couloir cinématique avec sections en overlay

> À lancer APRÈS la transformation visuelle initiale (PROMPT_CLAUDE_CODE.md) et idéalement APRÈS l'enrichissement E5 (PROMPT_E5_CONTENT.md).
> Ça transforme la séquence scroll-scrubbed simple décrite dans `refs/ANIMATIONS.md` en expérience narrative avec overlays.

---

## Prompt à coller dans Claude Code

```
Je veux transformer la section cinématique scroll-scrubbed actuelle (cf. refs/ANIMATIONS.md)
en une expérience narrative : pendant que le couloir avance avec mon scroll, certaines
sections s'affichent en overlay par-dessus, comme si je dépassais des "portes" en marchant.

Référence visuelle : Apple AirPods Max launch page, certains awwwards portfolios.

CONTEXTE
- La vidéo source Veo représente un couloir où la caméra avance.
- Les frames sont déjà extraites dans /assets/sequence/ (frame_NNNN.webp).
- Le canvas, le pinning, le mapping scroll→frame sont déjà implémentés.
- Tu modifies l'existant, tu ne repars pas de zéro.

SECTIONS À AFFICHER EN OVERLAY (dans cet ordre, pendant la traversée du couloir)

1. HERO TEXT (déjà en haut de page) → DÉPLACÉ dans la séquence cinématique, plus de
   section "Hero" séparée au-dessus. Contient :
   - Nom "Amory Danvy" en JetBrains Mono XL avec curseur _ clignotant
   - Tagline : "Développeur en alternance, spécialisé IA agentique."
   - Description (3 phrases, cf. BRIEF.md)
   - 2 CTAs : Projets / Contact

2. CARD PROJET TEASER 1 — Générateur de CV Dynamique
   - Titre, 1 phrase d'accroche, 3 tags techno (Python · HTML · CSS), CTA "En savoir plus →"
   - Le CTA scrolle vers la card détaillée plus bas dans la page (anchor)

3. CARD PROJET TEASER 2 — NewsHunter
   - Idem (Python · Tweepy · Automation)

4. CARD PROJET TEASER 3 — VintedBoost
   - Idem (Next.js · TypeScript · Gemini Vision · Convex)

5. CARD DE TRANSITION FINALE — "Continuer la visite ↓"
   - 1 phrase incitative + flèche animée vers le bas
   - Sortie symbolique du couloir, le visiteur continue dans les sections classiques

STRUCTURE DE LA PAGE APRÈS REFACTO
1. <section class="cinematic-corridor"> — 600vh, contient le canvas + les 5 overlays
2. <section id="projets"> — version DÉTAILLÉE des projets (conservée comme aujourd'hui)
3. <section id="apropos">
4. <section id="parcours">
5. <section id="competences"> (tableau de synthèse — NE PAS TOUCHER)
6. <section id="veille">
7. <section id="contact">
8. <footer>

Les CTAs des cards teaser dans le couloir scrollent vers les anchors #projet-cv,
#projet-newshunter, #projet-vintedboost dans la section Projets détaillée.

TIMING DES OVERLAYS (en pourcentage de scroll dans la section cinématique 600vh)
- 0-15% : Hero text visible, fade out à partir de 12%
- 15-22% : marche pure dans le couloir, aucun overlay
- 22-37% : Card projet 1 fade in (22-26%), stable (26-33%), fade out (33-37%)
- 37-44% : marche pure
- 44-59% : Card projet 2 (même pattern)
- 59-66% : marche pure
- 66-81% : Card projet 3 (même pattern)
- 81-90% : marche pure
- 90-100% : Card transition finale fade in et reste jusqu'à la fin

ANIMATION DES OVERLAYS (style Linear/Vercel, sobre)
- Entrée : opacity 0 → 1, translateY(40px) → translateY(0), scale(0.96) → scale(1)
- Sortie : opacity 1 → 0, translateY(0) → translateY(-40px), scale(1) → scale(1.02)
- Durée : 400ms cubic-bezier(0.16, 1, 0.3, 1)
- IMPORTANT : les transitions sont pilotées par la POSITION DU SCROLL, pas par un délai
  temporel. Quand le scroll passe le seuil 22%, le card commence son entrée ; à 26%
  il est complètement visible ; à 33% il commence sa sortie. Si l'utilisateur scrolle
  très vite, les transitions doivent suivre proportionnellement.

VISUAL DES CARDS OVERLAY
- Position : centrées dans le viewport (verticalement et horizontalement)
- Taille : max-width 560px (lisible mais pas oppressif sur le couloir)
- Background : var(--bg-elevated) avec opacity 0.92 pour laisser DEVINER le couloir
  derrière sans le rendre illisible
- Border : 1px solid var(--border-strong)
- Padding : 32px
- Border-radius : var(--radius) = 8px
- Box-shadow subtile : 0 24px 48px rgba(0,0,0,0.4)
- Texte : couleur var(--fg)
- CTA : fond var(--primary), texte var(--bg), hover : opacity 0.9

DIMMER DU COULOIR DERRIÈRE LES CARDS
Quand un card est >50% visible, ajouter un layer noir 0.3 opacity entre le canvas et
le card pour augmenter la lisibilité du texte. Ce dimmer s'anime avec la même progression
que le card.

CONTRAINTES TECHNIQUES
- Toujours skippé sur mobile (<768px) : afficher les sections normalement empilées,
  pas d'overlay, pas de canvas. Les hero+projets teasers deviennent juste des sections
  classiques en haut de page.
- Pas de framework JS, pas de build (cf. BRIEF.md §7).
- Lenis pour le smooth scroll est déjà actif.
- Le canvas et les overlays doivent rester sur le même listener scroll (un seul throttle,
  RAF, pour éviter le double calcul).
- Pas de lib supplémentaire — vanilla JS + CSS variables existantes.
- Les CTAs des cards teaser doivent être focusables et utilisables au clavier (Tab,
  Enter pour activer le scroll vers l'anchor). Important pour l'accessibilité E5.
- Si l'utilisateur a `prefers-reduced-motion: reduce`, désactiver TOUTES les animations
  d'overlay (les sections deviennent statiques, le canvas affiche la première frame).

PROCESSUS QUE JE VEUX
1. Tu lis BRIEF.md, refs/ANIMATIONS.md, et le code existant (index.html, style.css,
   script.js) pour comprendre l'état actuel.
2. Tu me résumes en 5 lignes ce que tu vas modifier (HTML, CSS, JS).
3. Tu me proposes 2 variantes pour le visual des cards overlay :
   - Variante A : cards solides comme décrit ci-dessus
   - Variante B : cards plus minimales, juste du texte sur le couloir avec un dimmer
     plus marqué, sans card visible
   J'attends que je choisisse.
4. Tu codes : d'abord le HTML restructuré (avec les overlays positionnés), puis le CSS,
   puis le JS qui gère les transitions liées au scroll. Tu me montres après chaque étape.
5. Tu testes mentalement les cas limites : scroll très rapide, scroll en arrière,
   redimensionnement de fenêtre, prefers-reduced-motion. Tu m'expliques comment chaque
   cas est géré.

EXIGENCE DE QUALITÉ
- Aucune saccade visible : à 60fps, les transitions doivent être fluides.
- Si une card est partiellement visible (entre fade in et stable, ou stable et fade out),
  son opacity doit être interpolée proportionnellement à la position de scroll, pas
  un simple "0 ou 1".
- Performance : ne pas re-calculer les positions à chaque frame inutilement. Utiliser
  requestAnimationFrame et invalider seulement quand le scroll a changé.

Commence par les étapes 1 et 2.
```

---

## Notes pour Amory

### Avant de lancer ce prompt

1. **Vérifie que le pipeline cinématique de base fonctionne** (frames extraites, canvas qui balaye au scroll). Sinon corrige ça d'abord avec `refs/ANIMATIONS.md`.
2. **Vérifie que les projets détaillés sont déjà en place** (PROMPT_E5_CONTENT.md effectué). Sinon les CTAs "En savoir plus →" pointeront vers du vide.
3. **Le tableau de synthèse des compétences reste où il est** — Claude Code a la consigne explicite de ne pas y toucher.

### Si tu veux ajuster ma sélection de sections

J'ai choisi : Hero + 3 projets teasers + transition finale. Si tu veux autre chose (ex : faire apparaître aussi une card "Veille technologique" ou "À propos"), modifie la section "SECTIONS À AFFICHER EN OVERLAY" et le timing en conséquence.

⚠️ Recommandation forte : **n'ajoute pas plus de sections en overlay**. Plus tu en mets, plus le visiteur a l'impression d'être bloqué dans une expérience plutôt que de naviguer librement. 5 overlays sur 600vh, c'est déjà beaucoup. Le BTS jury et un recruteur veulent pouvoir scroller vite à un moment.

### Test après implémentation

Avant de valider, fais ces 3 tests :
- **Scroll très rapide vers le bas** : les transitions doivent suivre, pas se figer.
- **Scroll en arrière puis en avant** : les cards doivent réapparaître/redisparaître normalement.
- **Onglet réduit** + redimensionnement : le canvas et les overlays se réajustent sans casser.
- **Mobile** (DevTools, viewport <768px) : la cinématique disparaît, hero+projets teasers deviennent des sections empilées normales.

### Performance attendue

- Lighthouse desktop : ≥ 80 (la cinématique pèse, c'est le coût)
- Lighthouse mobile : ≥ 85 (la cinématique est skippée donc moins d'impact)
- Si Lighthouse desktop chute sous 70, baisse `FRAME_COUNT` ou redimensionne les frames à 960px de large.
