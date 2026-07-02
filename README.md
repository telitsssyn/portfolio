# Portfolio — Pavel Telitsyn

Personal website: taplink (link-in-bio) + developer portfolio.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS 4
- **i18n**: `next-intl` v4 — two locales: `en` (default), `ru`
- **Fonts**: `next/font/google` — **Roboto Serif** (headings) + **Inter** (body). Both include `latin` + `cyrillic` subsets

## Development

First, run the development server (use the `--webpack` flag if you encounter Turbopack issues with Cyrillic paths):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build & Lint

```bash
# Type check
npx tsc --noEmit

# Linter
npm run lint

# Production build
npm run build
```

## i18n
- Locales: `en` (default), `ru`
- Route pattern: `/[locale]/...` (e.g., `/en`, `/ru/portfolio`)
- Translations: `messages/en.json`, `messages/ru.json`
