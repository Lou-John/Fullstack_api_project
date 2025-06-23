# ConfigurateurPC.com – API & BackOffice

## Contexte

Création d'un backoffice avec une API RESTful pour le site [ConfigurateurPC.com](https://configurateurpc.com). Cette API permet de gérer les composants matériels, les partenaires marchands, les utilisateurs et les configurations, tout en offrant une interface d’administration (BackOffice).

## Photos du projet

![image](https://github.com/user-attachments/assets/7142c016-2101-4028-b338-74b059f70dc7)
![image](https://github.com/user-attachments/assets/c1d2595b-5367-43b4-be9f-9ef3672901fd)

![image](https://github.com/user-attachments/assets/af3dfaef-d667-4ba4-b6d6-78ea9b97eddf)


## Fonctionnalités principales

### 1. Gestion des Catégories et Composants Matériels

- **Catégories de composants** : Lister toutes les catégories (CPU, GPU, RAM, etc.).
- **Composants** : Lister, ajouter, modifier, supprimer les composants matériels (marque, titre, prix, etc.).
- **Détail d’un composant** : Afficher les spécifications détaillées d’un composant.

### 2. Gestion des Partenaires Marchands et des Coûts

- **Partenaires** : Lister, ajouter, modifier, supprimer les partenaires marchands.
- **Prix partenaires** : Associer à chaque composant les prix proposés par les partenaires.
- **Calcul du coût total** : Calcul automatique du coût total d’une configuration.

### 3. Génération de Configuration

- **Liste des composants** : Générer une liste détaillée des composants sélectionnés.
- **Export PDF** : Exporter la configuration au format PDF.

### 4. Gestion des Utilisateurs

- **Inscription & Connexion** : Authentification sécurisée (JWT).
- **Gestion des configurations** : Sauvegarder et gérer plusieurs configurations par utilisateur.

### 5. Interface d’Administration (BackOffice)

- **Gestion des composants** : CRUD, filtres par catégorie et marque.
- **Gestion des utilisateurs** : Liste, recherche, détails, configurations associées.
- **Gestion des configurations** : Liste, recherche, modification/suppression.
- **Gestion des partenaires** : CRUD, gestion des prix et informations d’affiliation.
- **Sécurité** : Authentification administrateur via JWT.

---

## Architecture & Technologies

- **API** : Node.js, Express.js, MongoDB (Mongoose)
- **BackOffice** : React (TypeScript, Vite, TailwindCSS)
- **Authentification** : JWT (JSON Web Tokens)
- **Tests** : Jest, Supertest
- **Documentation** : OpenAPI (Swagger UI intégré)

---

## Installation

### Prérequis

- Node.js >= 18
- MongoDB

### 1. Cloner le projet

```bash
git clone <lien-du-repo>
cd projet_api/api
```
### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer l'API

```bash
npm start
```

### 4. Lancer le backoffice

```bash
cd ../backoffice
npm install
npm run dev
```
