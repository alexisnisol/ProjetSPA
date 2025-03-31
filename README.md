# README - Application Rainbow Six Siege

## Membres de l'équipe
- Alexis Nisol
- Alexy Wiciak

## Description du projet
Cette application web est dédiée au jeu Rainbow Six Siege. Elle recense tous les personnages du jeu, leurs armes et leurs capacités. L'application permet aux utilisateurs de noter les personnages, de les mettre en favori, de filtrer leur affichage et de gérer leurs équipements.

## Fonctionnalités
- Noter les personnages de 1 à 5.
- Liker les personnages et les ajouter aux favoris.
- Filtrer les personnages par rôle (Attaquant/Défenseur).
- Modifier l'équipement des personnages.
- Vue de listing des personnages.
- Vue détaillée d'un personnage avec ses caractéristiques.
- Système de pagination.
- Outil de recherche.
- JSON relationnel avec relations 1-n et n-n.
- Gestion des images avec lazy loading.

## Installation et Lancement
### Prérequis
Assurez-vous d'avoir **Node.js** et **PHP** installés sur votre machine.

### Installation
1. Installez JSON Server globalement :
   ```sh
   npm install -g json-server
   ```

### Lancement de l'application
1. Démarrer JSON Server :
   ```sh
   npx json-server data.json
   ```
2. Démarrer le serveur PHP :
   ```sh
   php -S localhost:8000
   ```

### Architecture du projet
- `index.html` : Fichier principal de l'application.
- `data.json` : Le fichier contenant les différentes tables (operateurs, specialte, armes...)
- `config.js` : Définit l'ENDPOINT du JSON Server.
- `app.js` : Gère le routage entre les différentes vues.
- `provider.js` : Parse les données JSON pour créer les objets dynamiquement.
- `views/` : Contient les différentes vues de l'application (listing, détail, favoris, etc.).

## Contraintes techniques
- Application développée en **Single Page Application (SPA)** avec un seul fichier HTML et plusieurs fichiers JavaScript.
- Organisation du code en **modules**.
- Utilisation de **classes et objets**.

## Remise du projet
- **TP Noté** du **03/03/25 au 06/04/25**.

---
**Encadrant :** C. DALAIGRE

