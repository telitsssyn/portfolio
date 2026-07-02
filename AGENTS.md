<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio — Pavel Telitsyn

Personal website: taplink (link-in-bio) + developer portfolio.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS 4 (`@theme inline` for design tokens)
- **i18n**: `next-intl` v4 — two locales: `en` (default), `ru`
- **Fonts**: `next/font/google` — **Roboto Serif** (headings) + **Inter** (body). Both include `latin` + `cyrillic` subsets
- **Utilities**: `clsx` + `tailwind-merge` via `cn()` helper in `src/lib/cn.ts`

## Project Structure

```
src/
├── app/
│   ├── globals.css            # Design tokens + animations
│   └── [locale]/
│       ├── layout.tsx         # Root layout (fonts, metadata, providers)
│       ├── page.tsx           # Landing / taplink page
│       └── portfolio/
│           └── page.tsx       # Portfolio page
├── components/
│   ├── Avatar.tsx             # Profile photo
│   ├── LanguageToggle.tsx     # EN / RU switch (client component)
│   ├── LinkTile.tsx           # Tile card + TileGrid wrapper
│   └── SocialIcons.tsx        # Social media icon row
├── config/
│   └── links.ts               # All external URLs, profile data
├── i18n/
│   ├── routing.ts             # Locale list + default locale
│   ├── request.ts             # next-intl request config
│   └── navigation.ts          # Locale-aware Link, useRouter, etc.
├── lib/
│   └── cn.ts                  # clsx + twMerge utility
└── proxy.ts                   # next-intl middleware (i18n routing)

messages/
├── en.json                    # English translations
└── ru.json                    # Russian translations

public/
├── avatar.png                 # Profile photo
└── icons/                     # SVG icons (social, tiles, flags)
```

## Design System

### Philosophy
Minimalist, dark, clean — inspired by Apple/Airbnb. No gradients, no glow, no glassmorphism. Neutral grays, lots of whitespace, subtle hover transitions.

### Color Palette
All colors are defined as CSS custom properties in `globals.css` and exposed to Tailwind via `@theme inline`:

| Token           | Hex       | Usage                          |
|-----------------|-----------|--------------------------------|
| `black`         | `#000000` | Page background                |
| `neutral-950`   | `#171717` | Card background                |
| `neutral-900`   | `#262626` | Tile backgrounds, dividers     |
| `neutral-800`   | `#404040` | Tile hover, icon circles       |
| `neutral-700`   | `#525252` | Footer text, subtle borders    |
| `neutral-600`   | `#767676` | Inactive toggle text           |
| `neutral-500`   | `#a1a1a1` | Muted text (role, subtitles)   |
| `neutral-400`   | `#c4c4c4` | Tile labels                    |
| `neutral-300`   | `#d4d4d4` | —                              |
| `neutral-200`   | `#e5e5e5` | Tile label hover               |
| `neutral-100`   | `#f5f5f5` | Primary text, headings         |

### Typography
- **Headings**: `font-serif` → Roboto Serif (semibold/bold, tight tracking)
- **Body**: `font-sans` → Inter (regular/medium)
- Both fonts loaded via `next/font/google` with `latin` + `cyrillic` subsets
- CSS variables: `--font-roboto-serif`, `--font-inter`

### Animations
Only one subtle animation: `fade-in` (opacity 0→1 + translateY 12px→0, 0.5s ease-out). Applied via `.animate-in` class with `.delay-1` through `.delay-5` for staggered entrance.

## i18n

- Locales: `en` (default), `ru`
- Route pattern: `/[locale]/...` (e.g., `/en`, `/ru/portfolio`)
- Translations: `messages/en.json`, `messages/ru.json`
- Middleware in `src/proxy.ts` handles locale detection and redirects
- Use `useTranslations("namespace")` in components
- Use `<Link>` from `@/i18n/navigation` for locale-aware links (not `next/link`)
- All new text **must** be added to both `en.json` and `ru.json`

## Development

```bash
# Dev server (use --webpack flag due to Turbopack bug with Cyrillic paths)
npx next dev --webpack

# Production build
npx next build --webpack

# Type check
npx tsc --noEmit
```

> **⚠ Turbopack limitation**: Turbopack crashes with Cyrillic characters in file paths (known Next.js 16 bug). Always use `--webpack` flag until the project is moved to an ASCII-only path or the bug is fixed.

## Conventions

- **Components**: functional, named exports. One component per file, file name matches export
- **Client components**: only when needed (interactivity). Mark with `"use client"` directive. Currently only `LanguageToggle.tsx`
- **Server components**: default. Use `setRequestLocale(locale)` in page components for static generation
- **Styling**: Tailwind utility classes. Use design tokens from the palette (e.g., `text-neutral-500`, `bg-neutral-900`). No arbitrary color values — stick to the defined palette
- **Links config**: all external URLs live in `src/config/links.ts`. Don't hardcode URLs in components
- **Icons**: SVG files in `public/icons/`, loaded via `<img>` tags
