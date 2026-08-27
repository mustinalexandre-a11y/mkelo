# Mkelo

Application de gestion financière personnelle — React + Vite, installable comme une PWA.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre ensuite l'adresse affichée dans le terminal (en général `http://localhost:5173`).

## Déployer sur Vercel (recommandé, gratuit)

1. Crée un dépôt GitHub et pousse ce dossier dedans.
2. Va sur [vercel.com](https://vercel.com), connecte ton compte GitHub.
3. Clique sur "New Project", sélectionne le dépôt Mkelo.
4. Vercel détecte Vite automatiquement — laisse les réglages par défaut et clique "Deploy".
5. En moins d'une minute, tu obtiens une URL du type `mkelo.vercel.app`, en HTTPS.

## Déployer sur Netlify (alternative)

1. Même principe : pousse le code sur GitHub.
2. Sur [netlify.com](https://netlify.com), "Add new site" → "Import an existing project".
3. Build command : `npm run build` — Publish directory : `dist`.

## Installer l'app sur un téléphone

Une fois le site en ligne :

- **Android (Chrome)** : ouvrir le site → menu ⋮ → "Ajouter à l'écran d'accueil" (ou une bannière d'installation apparaît automatiquement).
- **iPhone (Safari)** : ouvrir le site → bouton Partager → "Sur l'écran d'accueil".

L'icône Mkelo apparaît alors comme n'importe quelle autre application, sans barre d'adresse quand elle s'ouvre.

## Notes

- Les données (transactions, devise, thème) sont sauvegardées dans le `localStorage` du navigateur — propres à chaque appareil, sans compte ni serveur pour l'instant.
- Pour une synchronisation entre appareils (et une vraie authentification), l'étape suivante est de brancher un backend comme Supabase à la place du `localStorage` dans `src/App.jsx` (fonctions `loadTransactions` / `saveTransactions`).
