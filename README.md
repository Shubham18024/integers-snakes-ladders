# Integers: Snakes & Ladders

A modern React + Vite educational game to teach integers with fun themes, multiplayer, and AI mode.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Share URL config

Winner share uses this env variable if provided:

```bash
VITE_PUBLIC_APP_URL=https://anchorapp.me/integers-snakes-ladders/
```

If not set, default is `https://anchorapp.me/integers-snakes-ladders/`.

## Deploy to GitHub Pages

Current Vite base is configured for repo pages path:

- `/integers-snakes-ladders/`

Deploy command:

```bash
npm run deploy
```

Then in GitHub repo settings:

- Pages -> Deploy from branch
- Branch: `gh-pages`
- Folder: `/ (root)`

## Notes

- For a custom domain, configure DNS and add a `CNAME` file in `public/`.
- For external hosting (like `anchorapp.me`), keep `VITE_PUBLIC_APP_URL` set to your live URL.
