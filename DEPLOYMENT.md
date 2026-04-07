# Deployment Guide

This file explains the exact workflow to publish code and website updates.

## 1) Update code locally

```bash
cd /home/shubh/Music/integers-snakes-ladders
```

Make your changes, then verify:

```bash
npm install
npm run build
```

## 2) Push source code to GitHub (`main`)

```bash
git status
git add .
git commit -m "Your clear commit message"
git push
```

This updates repository source files only.

## 3) Publish website (`gh-pages`)

```bash
npm run deploy
```

This command:
- runs `npm run build`
- publishes `dist/` to the `gh-pages` branch

## 4) Verify live links

- Main hosted link: `http://anchorapp.me/integers-snakes-ladders/`
- GitHub Pages link: `https://shubham18024.github.io/integers-snakes-ladders/`

## 5) If changes are not visible

- Hard refresh browser (`Ctrl + Shift + R`)
- Test in Incognito
- Wait 2-5 minutes for CDN updates
- Re-run deployment:

```bash
npm run deploy
```

## 6) Share URL config

The game winner share action uses this env variable if provided:

```bash
VITE_PUBLIC_APP_URL=https://anchorapp.me/integers-snakes-ladders/
```

If not set, code falls back to the same production URL.
