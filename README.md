# Midhun Prahash Portfolio

A personal AI/ML portfolio site for Midhun Prahash SR, with selected GitHub projects, professional experience, research, and technical writing.

The site is built from resume content and highlights AI/ML internships, RAG systems, GraphRAG, vector search, voice AI, projects, technical skills, research, patent work, and achievements.

## Stack

- React
- TypeScript
- Vite
- CSS
- Vercel

## Run Locally

```bash
bun install
bun run dev
```

Open the local URL printed by Vite, usually:

```bash
http://127.0.0.1:5173/
```

## Useful Commands

```bash
bun run lint
bun run build
bun run preview
```

## Project Files

- `src/App.tsx` - portfolio content and page structure
- `src/App.css` - page styling and responsive layout
- `src/index.css` - global styles
- `public/midhun-prahash-resume-aiml.pdf` - user-supplied résumé, updated October 1, 2026
- `public/midhun-prahash.jpg` - optimized user-supplied portrait
- `public/knowledge-graph.jpg` - decorative generated research illustration
- `vercel.json` - Vercel static deployment config

## Deployment

The site deploys as a static Vite app on Vercel.

Vercel should use:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`

The `vercel.json` file also rewrites all routes to `index.html`, which keeps the single-page app working on direct page loads.

## Content and accessibility

Experience and education follow the supplied résumé; featured project summaries link to their GitHub repositories. The research article stays at `/articles/semantic-spike-language-framework`. The portfolio includes light/dark themes, a keyboard skip link, visible focus indicators, responsive layouts, and reduced-motion support.

## Routes

- `/` - introduction, selected work, experience, and contact
- `/projects` - featured GitHub projects and earlier explorations
- `/publications` - conference publication with IEEE Xplore and Google Scholar links
- `/patents` - patent application details
- `/articles` - research writing
- `/articles/semantic-spike-language-framework` - original research article

The website contact address is `midhunprahashh@gmail.com`. The supplied résumé PDF is preserved byte-for-byte, including its original contact details.

## Typography and article math

Roboto variable fonts are self-hosted in `public/fonts` under the included SIL Open Font License. Text uses stronger weights and contrast in both themes.

Articles use `react-markdown`, GFM, and KaTeX, loaded on demand. Use fenced `math` blocks or `$$...$$` for display equations and `$...$` for inline math. Ordinary fenced code stays as code; KaTeX includes accessible MathML. The renderer lives in `src/components/MarkdownArticle.tsx`.

The publication author list follows the [ICITIIT 2026 conference schedule](https://icitiit26.iiitkottayam.ac.in/files/paper-presentation-schedule.pdf) and the [Crossref DOI record](https://api.crossref.org/works/10.1109/icitiit68860.2026.11499725): Midhun Prahash SR, Rhea Alphonsa Jose, and Sam. V. George.
