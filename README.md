# FastAPI + React + ELK Stack - Starter Kit Fullstack

Un starter kit fullstack monorepo prêt pour la production, avec FastAPI (backend), React (frontend), PostgreSQL, et la stack ELK pour le monitoring et l'analyse des logs.

## Utiliser ce projet

Ce projet peut être utilisé comme template GitHub ou forké directement. Consultez [TEMPLATE_USAGE.md](TEMPLATE_USAGE.md) pour les instructions détaillées.

## Table des matières

- [Prérequis](#prérequis)
- [Architecture](#architecture)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Accès aux services](#accès-aux-services)
- [Développement](#développement)
- [Structure du projet](#structure-du-projet)
- [Configuration](#configuration)
- [Logging et Monitoring](#logging-et-monitoring)
- [Déploiement](#déploiement)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Docker** (version 20.10+) et **Docker Compose** (version 2.0+)
- **Node.js** (version 18+) et **npm** (version 9+)
- **Python** (version 3.11+) - uniquement si vous voulez développer le backend en local
- **Git**

### Vérification des prérequis

```bash
# Vérifier Docker
docker --version
docker compose version

# Vérifier Node.js
node --version
npm --version

# Vérifier Python (optionnel)
python --version
```

## Architecture

Ce projet suit une architecture monorepo avec les composants suivants :

```
fastapi-react-elk-starter/
├── backend/          # Application FastAPI (Python)
├── frontend/         # Application React (TypeScript + Vite)
├── infrastructure/   # Configurations Docker & ELK
├── docker-compose.yml
└── README.md
```

### Stack technique

- **Backend** : FastAPI (Python 3.11+), SQLAlchemy (async), Alembic, Pydantic v2
- **Frontend** : React 18+, Vite, TypeScript, TailwindCSS, Lucide React
- **Database** : PostgreSQL 15
- **Monitoring** : Elasticsearch 8.11, Logstash 8.11, Kibana 8.11
- **Containerisation** : Docker & Docker Compose

## Installation

### 1. Cloner le projet

```bash
git clone <votre-repo-url>
cd fastapi-react-elk-starter
```

### 2. Configurer les variables d'environnement

```bash
# Copier le fichier d'exemple
cp env.example .env

# Éditer .env selon vos besoins
# Pour une base de données externe (Neon, Supabase), modifiez DATABASE_URL
```

### 3. Installer les dépendances du frontend

```bash
cd frontend
npm install
cd ..
```

### 4. (Optionnel) Créer un environnement virtuel Python pour le backend

```bash
cd backend
python -m venv venv

# Sur Windows
venv\Scripts\activate

# Sur Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
cd ..
```

## Démarrage

### Démarrage complet avec Docker Compose

Cette commande lance tous les services (PostgreSQL, Elasticsearch, Logstash, Kibana, Backend) :

```bash
docker compose up -d
```

Pour voir les logs en temps réel :

```bash
docker compose up
```

Pour arrêter tous les services :

```bash
docker compose down
```

Pour arrêter et supprimer les volumes (supprime les données) :

```bash
docker compose down -v
```

### Démarrage du frontend en mode développement

Dans un terminal séparé :

```bash
cd frontend
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173` (ou le port configuré par Vite).

## Accès aux services

Une fois tous les services démarrés, vous pouvez accéder à :

| Service | URL | Description |
|---------|-----|-------------|
| **Backend API** | http://localhost:8000 | API FastAPI |
| **Swagger UI** | http://localhost:8000/docs | Documentation interactive de l'API |
| **ReDoc** | http://localhost:8000/redoc | Documentation alternative de l'API |
| **Frontend** | http://localhost:5173 | Application React (en dev) |
| **Kibana** | http://localhost:5601 | Interface de visualisation des logs |
| **Elasticsearch** | http://localhost:9200 | API Elasticsearch |
| **PostgreSQL** | localhost:5432 | Base de données (utiliser un client comme pgAdmin ou DBeaver) |

### Vérification de l'état des services

```bash
# Voir l'état de tous les conteneurs
docker compose ps

# Voir les logs d'un service spécifique
docker compose logs backend
docker compose logs elasticsearch
docker compose logs logstash
docker compose logs kibana
```

## Développement

### Backend (FastAPI)

#### Structure du backend

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/    # Routes API
│   ├── core/                  # Configuration, sécurité, logging
│   ├── db/                    # Session DB, base models
│   ├── models/                # Modèles SQLAlchemy
│   ├── schemas/               # Schémas Pydantic
│   ├── services/              # Logique métier
│   └── main.py                # Point d'entrée
├── alembic/                   # Migrations
├── Dockerfile
└── requirements.txt
```

#### Lancer le backend en local (sans Docker)

```bash
cd backend
source venv/bin/activate  # ou venv\Scripts\activate sur Windows
uvicorn app.main:app --reload --port 8000
```

#### Migrations de base de données

```bash
cd backend

# Créer une nouvelle migration
alembic revision --autogenerate -m "Description de la migration"

# Appliquer les migrations
alembic upgrade head

# Revenir en arrière
alembic downgrade -1
```

### Frontend (React)

#### Structure du frontend

```
frontend/
├── src/
│   ├── components/            # Composants réutilisables
│   ├── features/             # Features par domaine
│   ├── hooks/                # Custom hooks
│   ├── services/             # Services API (axios)
│   ├── types/                # Types TypeScript
│   ├── utils/                # Utilitaires
│   └── App.tsx
├── public/
├── vercel.json               # Configuration Vercel
└── package.json
```

#### Commandes disponibles

```bash
cd frontend

# Développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Linting
npm run lint
```

## Structure du projet

```
fastapi-react-elk-starter/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   ├── __init__.py
│   │   │       │   ├── health.py
│   │   │       │   └── items.py
│   │   │       └── router.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   ├── logger.py
│   │   │   └── security.py
│   │   ├── db/
│   │   │   ├── __init__.py
│   │   │   └── session.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── item.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── item.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── item_service.py
│   │   └── main.py
│   ├── alembic/
│   │   ├── versions/
│   │   └── env.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── vercel.json
├── infrastructure/
│   └── logstash/
│       ├── pipeline/
│       │   └── logstash.conf
│       └── config/
│           └── logstash.yml
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Configuration

### Variables d'environnement

Le fichier `.env` contient toutes les configurations nécessaires :

- **Database** : Configuration PostgreSQL
- **Backend** : Port, clé secrète, CORS
- **ELK Stack** : Ports pour Elasticsearch, Logstash, Kibana
- **DATABASE_URL** : URL complète de la base de données (peut pointer vers une DB externe)

### Utiliser une base de données externe

Pour utiliser une base de données externe (Neon, Supabase, etc.), modifiez simplement `DATABASE_URL` dans `.env` :

```env
DATABASE_URL=postgresql+asyncpg://user:password@host:port/database
```

Puis commentez ou supprimez le service `postgres` dans `docker-compose.yml` si vous n'en avez plus besoin.

## Logging et Monitoring

### Architecture de logging

Le backend envoie automatiquement tous les logs au format JSON vers Logstash via TCP (port 5000). Logstash les indexe dans Elasticsearch, et vous pouvez les visualiser dans Kibana.

### Middleware de logging

Chaque requête HTTP est automatiquement loggée avec :
- **Request ID** : Identifiant unique pour tracer une requête
- **Temps de réponse** : Durée de traitement
- **Status Code** : Code de statut HTTP
- **Méthode et URL** : Méthode HTTP et chemin
- **IP client** : Adresse IP du client

### Visualiser les logs dans Kibana

1. Accédez à Kibana : http://localhost:5601
2. Allez dans **Discover** (menu de gauche)
3. Créez un index pattern si nécessaire : `logstash-*`
4. Explorez vos logs en temps réel !

### Exemple de log

```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "INFO",
  "request_id": "abc123",
  "method": "GET",
  "path": "/api/v1/items",
  "status_code": 200,
  "response_time_ms": 45.2,
  "client_ip": "192.168.1.1"
}
```

## Déploiement

### Backend

Le backend peut être déployé sur :
- **Heroku** : Utilisez le `Dockerfile` fourni
- **AWS ECS/Fargate** : Utilisez `docker-compose.yml` comme référence
- **DigitalOcean App Platform** : Configuration Docker
- **Railway** : Support Docker natif

### Frontend

Le frontend peut être déployé sur :
- **Vercel** : Le fichier `vercel.json` est déjà configuré
- **Netlify** : Configuration similaire
- **AWS S3 + CloudFront** : Après build (`npm run build`)

### Variables d'environnement en production

Assurez-vous de définir toutes les variables d'environnement nécessaires dans votre plateforme de déploiement, notamment :
- `SECRET_KEY` : Utilisez une clé forte et aléatoire
- `DATABASE_URL` : URL de votre base de données de production
- `CORS_ORIGINS` : URLs autorisées pour CORS
- `LOGSTASH_HOST` et `LOGSTASH_PORT` : Si vous utilisez ELK en production

## Tests

### Backend

```bash
cd backend
pytest
```

### Frontend

```bash
cd frontend
npm test
```

## Notes importantes

- **Elasticsearch RAM** : Limité à 1GB via `ES_JAVA_OPTS` pour éviter de surcharger votre machine
- **Hot Reload** : Le backend et le frontend supportent le hot reload en développement
- **CORS** : Configuré pour accepter les requêtes depuis `localhost:5173` et `localhost:3000` par défaut
- **Sécurité** : Changez `SECRET_KEY` en production !

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT License

---

Starter kit pour projets professionnels
