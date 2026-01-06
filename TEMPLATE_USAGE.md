# Utiliser ce projet comme template

Ce projet peut être utilisé de plusieurs façons pour démarrer rapidement un nouveau projet fullstack.

## Option 1 : Utiliser comme Template GitHub

### Créer un template depuis ce repository

1. Allez sur la page principale du repository
2. Cliquez sur le bouton **Settings** (en haut à droite)
3. Dans la section **Template repository**, cochez la case **Template repository**
4. Cliquez sur **Save**

Maintenant, les utilisateurs pourront créer un nouveau repository depuis ce template en cliquant sur le bouton **Use this template** sur la page principale du repo.

### Utiliser ce template pour créer un nouveau projet

1. Allez sur la page principale du repository
2. Cliquez sur le bouton vert **Use this template**
3. Choisissez **Create a new repository**
4. Donnez un nom à votre nouveau repository
5. Choisissez si vous voulez qu'il soit public ou privé
6. Cliquez sur **Create repository from template**

Votre nouveau repository contiendra tous les fichiers de ce template, prêt à être utilisé.

## Option 2 : Forker le repository

### Forker le projet

1. Allez sur la page principale du repository
2. Cliquez sur le bouton **Fork** (en haut à droite)
3. Choisissez l'organisation ou le compte où vous voulez forker
4. Cliquez sur **Create fork**

### Cloner votre fork

```bash
git clone https://github.com/VOTRE-USERNAME/fastapi-react-elk-starter.git
cd fastapi-react-elk-starter
```

### Configurer le remote upstream (optionnel)

Si vous voulez garder votre fork à jour avec le repository original :

```bash
git remote add upstream https://github.com/ORIGINAL-OWNER/fastapi-react-elk-starter.git
```

Pour synchroniser votre fork :

```bash
git fetch upstream
git merge upstream/main
git push
```

## Option 3 : Cloner et modifier

### Cloner le repository

```bash
git clone https://github.com/VOTRE-USERNAME/fastapi-react-elk-starter.git
cd fastapi-react-elk-starter
```

### Supprimer l'historique Git (pour un nouveau projet)

Si vous voulez créer un nouveau projet sans l'historique Git :

```bash
rm -rf .git
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/votre-nouveau-projet.git
git push -u origin main
```

### Modifier les informations du projet

1. **README.md** : Mettez à jour le titre et la description
2. **package.json** (frontend) : Changez le nom du package
3. **backend/app/core/config.py** : Modifiez `APP_NAME` et `APP_VERSION`
4. **docker-compose.yml** : Ajustez les noms des conteneurs si nécessaire

## Configuration initiale

Après avoir cloné ou créé un nouveau projet depuis ce template :

### 1. Configurer les variables d'environnement

```bash
cp env.example .env
```

Éditez le fichier `.env` avec vos configurations.

### 2. Installer les dépendances

```bash
# Frontend
cd frontend
npm install
cd ..

# Backend (optionnel si vous utilisez Docker)
cd backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate sur Windows
pip install -r requirements.txt
cd ..
```

### 3. Lancer les services

```bash
# Démarrer tous les services avec Docker
docker compose up -d

# Démarrer le frontend en mode développement
cd frontend
npm run dev
```

## Personnalisation

### Changer le nom de l'application

1. **Frontend** : Modifiez `frontend/src/App.tsx` (titre dans le header)
2. **Backend** : Modifiez `backend/app/core/config.py` (APP_NAME)
3. **README.md** : Mettez à jour le titre et la description

### Ajouter vos propres modèles

1. Créez vos modèles dans `backend/app/models/`
2. Créez les schémas correspondants dans `backend/app/schemas/`
3. Créez les services dans `backend/app/services/`
4. Créez les endpoints dans `backend/app/api/v1/endpoints/`
5. Ajoutez les routes dans `backend/app/api/v1/router.py`

### Personnaliser le frontend

1. Modifiez les composants dans `frontend/src/components/`
2. Ajoutez vos propres hooks dans `frontend/src/hooks/`
3. Personnalisez les styles dans `frontend/src/index.css` et `tailwind.config.js`

## Support

Pour toute question ou problème, ouvrez une issue sur le repository.

## Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.
