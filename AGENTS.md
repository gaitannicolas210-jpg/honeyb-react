# honeyb-react

## Tech stack

- **Vite 8** + **React 19** (JSX, **no TypeScript** — all source is `.jsx`)
- **CSS** only (no preprocessor, no CSS-in-JS, no framework)
- **ESLint 10** flat config (`eslint.config.js`) with `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start Vite dev server (HMR, default `localhost:5173`) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | Run ESLint on all files |

**No test command — no testing dependencies exist.**

## Quirks

- `eslint-plugin-react-refresh` enforces `react-refresh/only-export-components` on `**/*.{js,jsx}` — component files must only export React components. Adding non-component exports (helpers, constants) to a JSX file will trigger a lint error.
- ESLint ignores `dist/` via `globalIgnores(['dist'])` in the flat config.
- Spanish-language UI throughout (website is a Colombian brand landing page).
- Single-page app — no React Router, no state management library, no API layer. App component and CSS live directly in `src/`.

## Entrypoint

`src/main.jsx` → mounts `<App />` to `#root` in `index.html`.
