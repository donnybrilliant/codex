# codex

Client made ready to deply on:

- Github Pages
- Vercel
- Render
- Netlify
- Surge

Server deployed on render.com

## Futute Changes

To deploy client, only Github Pages needs base: "/codex/" in vite.config.js
Annoying to set up for most of the other deploymet platforms.

Maybe it would be better to put base: /
And then add --base /codex/ to .github/worklows/deploy.yml

Or create something like this one which in this case will become redundant.
"netlify": "vite build --base /"
"gh-pages": "vite build --base /codex/"
