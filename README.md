# Portfolio BTS SIO SLAM

Portfolio professionnel pour étudiant BTS SIO option SLAM (Solutions Logicielles et Applications Métiers).

## 📋 Description

Ce portfolio moderne et responsive présente les compétences, projets et expériences d'un étudiant en BTS SIO option SLAM. Il est conçu pour mettre en valeur le parcours et les réalisations techniques de manière professionnelle.

## 🚀 Fonctionnalités

- ✅ Design moderne et professionnel
- ✅ 100% responsive (mobile, tablette, desktop)
- ✅ Navigation fluide avec menu fixe
- ✅ Animations au scroll (AOS.js)
- ✅ Formulaire de contact fonctionnel
- ✅ Section projets avec filtres
- ✅ Timeline des expériences
- ✅ Section veille technologique
- ✅ Optimisé pour le SEO

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles personnalisés
- **Tailwind CSS** - Framework CSS utility-first
- **JavaScript** - Interactions et animations
- **AOS.js** - Animations on scroll
- **Font Awesome** - Icônes

## 📁 Structure du projet

```
portfolio/
├── assets/
│   ├── css/
│   │   └── styles.css      # Styles personnalisés
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   ├── images/             # Images et médias
│   └── fonts/              # Polices personnalisées
├── index.html              # Page principale
├── tailwind.config.js      # Configuration Tailwind
├── package.json            # Dépendances npm
└── README.md              # Documentation
```

## 🚀 Installation

### Prérequis

- Node.js (optionnel, pour le développement)
- Un navigateur web moderne

### Installation simple (sans npm)

1. Cloner le repository :
```bash
git clone https://github.com/votre-username/portfolio-bts-sio.git
cd portfolio-bts-sio
```

2. Ouvrir `index.html` dans votre navigateur

### Installation avec npm (recommandé pour le développement)

1. Cloner le repository :
```bash
git clone https://github.com/votre-username/portfolio-bts-sio.git
cd portfolio-bts-sio
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Pour compiler Tailwind CSS :
```bash
npm run build:css
```

## 📝 Personnalisation

### Modifier les informations personnelles

1. Ouvrir `index.html`
2. Remplacer "Jean Dupont" par votre nom
3. Mettre à jour les sections suivantes :
   - **Accueil** : Votre nom et accroche
   - **À propos** : Votre parcours et objectifs
   - **Compétences** : Vos technologies maîtrisées
   - **Projets** : Vos réalisations
   - **Expériences** : Vos stages et alternances
   - **Contact** : Vos coordonnées

### Ajouter des projets

Dans la section projets de `index.html`, dupliquer un bloc projet et modifier :
```html
<div class="bg-gray-50 rounded-lg overflow-hidden shadow-lg card-hover">
    <img src="votre-image.jpg" alt="Nom du projet">
    <div class="p-6">
        <h3>Nom du projet</h3>
        <p>Description du projet</p>
        <div class="flex flex-wrap gap-2">
            <span>Technologie 1</span>
            <span>Technologie 2</span>
        </div>
        <a href="lien-github">Voir sur GitHub</a>
    </div>
</div>
```

### Modifier les couleurs

Les couleurs principales sont définies dans :
- `assets/css/styles.css` : Variables CSS personnalisées
- `tailwind.config.js` : Configuration Tailwind

## 🌐 Déploiement

### GitHub Pages

1. Push votre code sur GitHub
2. Aller dans Settings > Pages
3. Sélectionner la branche `main` et le dossier `/root`
4. Votre site sera accessible à : `https://votre-username.github.io/portfolio-bts-sio/`

### Netlify

1. Connecter votre repository GitHub à Netlify
2. Deploy automatique à chaque push

### Hébergement classique

Upload tous les fichiers via FTP sur votre hébergeur web.

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter :
- Email : jean.dupont@email.com
- LinkedIn : [linkedin.com/in/jeandupont](https://linkedin.com)
- GitHub : [github.com/jeandupont](https://github.com)

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier pour votre usage personnel.

## 🙏 Remerciements

- [Tailwind CSS](https://tailwindcss.com/) pour le framework CSS
- [AOS](https://michalsnik.github.io/aos/) pour les animations
- [Font Awesome](https://fontawesome.com/) pour les icônes
- La communauté BTS SIO pour le support

---

Développé avec ❤️ par un étudiant BTS SIO SLAM