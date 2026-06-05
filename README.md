# Midhun Prahash Portfolio

A personal AIML portfolio site for Midhun Prahash SR.

The site is built from resume content and highlights AI/ML internships, RAG systems, GraphRAG, vector search, voice AI, projects, technical skills, research, patent work, and achievements.

## Stack

- React
- TypeScript
- Vite
- CSS
- Vercel

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```bash
http://127.0.0.1:5173/
```

## Useful Commands

```bash
npm run lint
npm run build
npm run preview
```

## Project Files

- `src/App.tsx` - portfolio content and page structure
- `src/App.css` - page styling and responsive layout
- `src/index.css` - global styles
- `public/midhun-prahash-resume-aiml.pdf` - downloadable resume
- `vercel.json` - Vercel static deployment config

## Deployment

The site deploys as a static Vite app on Vercel.

Vercel should use:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`

The `vercel.json` file also rewrites all routes to `index.html`, which keeps the single-page app working on direct page loads.
