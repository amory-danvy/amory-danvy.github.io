# Prompt Claude Code — Enrichissement contenu E5

> À lancer APRÈS la transformation visuelle (cf. PROMPT_CLAUDE_CODE.md).
> Objectif : passer de descriptions marketing à du contenu de niveau E5 BTS SIO SLAM.
> Claude Code ne doit RIEN inventer — il doit m'interviewer pour collecter le vrai contenu.

---

## Prompt à coller dans Claude Code

```
Mon portfolio est dans le cadre de mon épreuve E5 du BTS SIO option SLAM. Je passe l'oral
prochainement (10 min de présentation + 30 min de questions/réponses avec le jury).

Le design visuel est OK. Le tableau de synthèse des compétences est déjà présent.

Ce qui manque pour atteindre le niveau E5 :
1. Les 3 cards de projets ont des descriptions trop superficielles (3-4 phrases marketing).
   Le jury va creuser pendant 10 min sur chaque projet, je dois pouvoir tout justifier.
2. La section "Veille technologique" liste 3 articles mais n'explique pas ma méthodologie
   de veille (sources, fréquence, outils, processus de tri).

CONTRAINTES STRICTES
- Tu n'inventes RIEN. Tout le contenu doit sortir de mes réponses à tes questions.
- Tu respectes le brief existant (BRIEF.md) : palette acier+bleu nuit, JetBrains Mono,
  pas de framework, HTML/CSS/JS purs, GitHub Pages compatible.
- Tu NE TOUCHES PAS au tableau de synthèse des compétences (déjà présent et validé).
- Tu NE TOUCHES PAS au design des autres sections (Hero, À propos, Parcours, Contact).
- Pour les projets, tu remplaces les cards marketing actuelles par des cards qui
  ouvrent une vue détaillée (modal ou page dédiée — tu proposeras les deux options).

PROCESSUS QUE JE VEUX

ÉTAPE 1 — Pour chaque projet (Générateur de CV, NewsHunter, VintedBoost), tu me poses
les questions suivantes UNE PAR UNE (pas en bloc) :

  a. Contexte : pourquoi ce projet ? Pour qui ? Cadre (BTS, perso, alternance) ?
  b. Cahier des charges : quels étaient les besoins/exigences au départ ?
  c. Choix techniques : pourquoi cette stack précisément ? Qu'est-ce que tu as
     écarté et pourquoi ?
  d. Démarche : comment tu as structuré le développement ? Méthodologie ?
  e. Difficultés rencontrées : 2 ou 3 problèmes concrets, comment tu les as résolus.
  f. Apprentissages : qu'est-ce que tu as appris de ce projet ?
  g. Bloc(s) de compétences SLAM mobilisés (Concevoir/développer, Maintenance,
     Gérer les données, Support/services, Cybersécurité). Tu m'aides à choisir
     selon ce que je décris.

ATTENDS MES RÉPONSES avant de passer au projet suivant. Si une réponse est trop courte
ou floue, relance-moi (par exemple : "tu peux préciser ce que tu entends par X ?").

ÉTAPE 2 — Pour la Veille technologique :

  a. Sujet de veille (déjà : "Les assistants de codage IA générative") — tu valides
     la formulation actuelle ou tu en proposes une plus précise.
  b. Pourquoi ce sujet ? En quoi il est lié à mon métier/alternance ?
  c. Sources utilisées (déjà mentionnées : Feedly, Dev.to, Hacker News, GitHub
     Trending) — quelles autres ? Comment tu les as choisies ?
  d. Méthodologie : à quelle fréquence tu fais ta veille ? Comment tu tries
     l'information ? Comment tu décides ce qui mérite une analyse approfondie ?
  e. Outils annexes : prends-tu des notes ? Où ? Comment tu archives ?
  f. Bilan : qu'est-ce que cette veille t'a apporté concrètement (dans tes
     projets, dans ton alternance) ?

Pareil : questions une par une, attendre mes réponses.

ÉTAPE 3 — Une fois que tu as tout collecté, tu me proposes 2 options pour la
restructuration des sections :

  Option A : modal au clic sur une card (reste sur la même page)
  Option B : page dédiée par projet (/projet/cv.html, /projet/newshunter.html, etc.)

Pour chacune, tu m'expliques les pros/cons en termes :
- Lecture par le jury (qui fera défiler le portfolio rapidement)
- Référencement / partage de liens directs
- Complexité de maintenance
- Cohérence avec le design existant

J'attends que je choisisse avant de coder.

ÉTAPE 4 — Tu codes section par section. Tu me montres chaque section avant de
passer à la suivante. Ordre :
  1. Restructuration des 3 cards projets (vue compacte)
  2. Vue détaillée du projet 1
  3. Vue détaillée du projet 2
  4. Vue détaillée du projet 3
  5. Restructuration de la section Veille (méthodologie + articles)

ÉTAPE 5 — Passe finale : tu vérifies l'accessibilité (focus states, ARIA, contraste),
les liens internes/externes, le responsive, et tu fais un Lighthouse mental.

EXIGENCES DE FORME pour les contenus
- Pas de jargon vide ("solution innovante", "expérience utilisateur optimisée").
- Phrases courtes, factuelles. Le jury préfère "j'ai utilisé Tweepy parce que
  l'API X officielle a un quota gratuit insuffisant" que "j'ai sélectionné une
  bibliothèque adaptée à mes besoins".
- Mentionner les chiffres concrets quand ils existent (lignes de code, nombre
  d'utilisateurs, temps de dev, etc.).
- Citer les compétences référentielles avec leur intitulé exact.

Commence par me dire que tu as compris le process et lance la première question
sur le projet "Générateur de CV Dynamique".
```

---

## Notes pour Amory

### Comment t'y prendre

1. **Bloque 1h30-2h** pour la session avec Claude Code. Réponds sans précipitation.
2. **Pour CHAQUE projet**, prépare avant de répondre :
   - Le code source ouvert dans un autre onglet (pour relire les choix techniques)
   - Ton historique de commits Git si tu l'as (`git log --oneline`)
   - Les vraies difficultés rencontrées (pas "j'ai eu du mal avec le CSS" — sois précis : "le PDF généré côté serveur perdait l'encodage UTF-8 sur les accents, j'ai dû passer de pdfkit à reportlab").

3. **Sois honnête sur les limites**. Si tu as utilisé GitHub Copilot ou Claude pour coder, dis-le. Le jury préfère un candidat lucide ("j'ai utilisé Copilot pour générer le boilerplate, mais j'ai relu et compris chaque ligne, voici la fonction que j'ai dû réécrire entièrement parce que la suggestion était fausse") qu'un menteur démasqué en 30 secondes.

### Ce que tu dois savoir par cœur après cette session

Pour chaque projet, tu dois être capable de répondre sans hésitation à :
- "Explique-moi cette requête SQL / cette fonction ligne par ligne"
- "Pourquoi as-tu choisi telle techno plutôt que telle autre ?"
- "Si tu devais refaire ce projet, qu'est-ce que tu changerais ?"
- "Quelles failles de sécurité a ton appli, et comment tu les corrigerais ?" (bonus E5)
- "Quelle compétence du référentiel as-tu mobilisée ici ?"

### Mapping référentiel BTS SIO 2020 (rappel)

**Bloc 1 (commun) — Support et mise à disposition de services informatiques**
- Gérer le patrimoine informatique
- Répondre aux incidents et aux demandes d'assistance et d'évolution
- Développer la présence en ligne de l'organisation
- Travailler en mode projet
- Mettre à disposition des utilisateurs un service informatique
- Organiser son développement professionnel

**Bloc 2 SLAM — Conception et développement d'applications**
- Concevoir et développer une solution applicative
- Assurer la maintenance corrective ou évolutive d'une solution applicative
- Gérer les données

**Bloc 3 (commun) — Cybersécurité des services informatiques**
- Protéger les données à caractère personnel
- Préserver l'identité numérique de l'organisation
- Sécuriser les équipements et les usages des utilisateurs
- Garantir la disponibilité, l'intégrité et la confidentialité des services informatiques et des données
- Assurer la cybersécurité d'une solution applicative et de son développement
