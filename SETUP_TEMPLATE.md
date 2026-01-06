
## Utilisation du template

### Pour les utilisateurs

1. Allez sur https://github.com/sikakaleb/fastapi-react-elk-starter
2. Cliquez sur le bouton **Use this template** (vert, en haut à droite)
3. Choisissez **Create a new repository**
4. Donnez un nom à votre nouveau repository
5. Choisissez la visibilité (public/privé)
6. Cliquez sur **Create repository from template**

Votre nouveau repository contiendra tous les fichiers du template, sans l'historique Git du template original.

### Alternative : Fork

Si vous préférez forker le repository :

1. Cliquez sur **Fork** (en haut à droite)
2. Choisissez votre compte/organisation
3. Cliquez sur **Create fork**

Note : Le fork conserve l'historique Git et le lien avec le repository original.

## Après avoir créé un nouveau projet

### 1. Cloner le repository

```bash
git clone https://github.com/VOTRE-USERNAME/votre-nouveau-projet.git
cd votre-nouveau-projet
```

### 2. Configuration initiale

```bash
# Copier les variables d'environnement
cp env.example .env

# Installer les dépendances frontend
cd frontend
npm install
cd ..
```

### 3. Personnaliser le projet

- Modifier `README.md` avec le nom de votre projet
- Modifier `backend/app/core/config.py` : changer `APP_NAME`
- Modifier `frontend/src/App.tsx` : changer le titre dans le header
- Modifier `frontend/package.json` : changer le nom du package

### 4. Lancer le projet

```bash
# Démarrer tous les services
docker compose up -d

# Dans un autre terminal, lancer le frontend
cd frontend
npm run dev
```

## Structure du template

Le template inclut :

- Backend FastAPI complet avec structure modulaire
- Frontend React avec TypeScript et TailwindCSS
- Configuration Docker Compose pour tous les services
- Stack ELK (Elasticsearch, Logstash, Kibana) configurée
- Système de logging intégré
- Migrations Alembic configurées
- Documentation complète

## Support

Pour toute question, ouvrez une issue sur le repository original.
