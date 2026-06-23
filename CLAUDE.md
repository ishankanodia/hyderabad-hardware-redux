# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/portfolio single-page app for **Hyderabad Hardware**, a luxury interior-hardware showroom in Hyderabad. It showcases experience centres for partner brands **Blum** (Austrian kitchen hardware) and **Astronea** (Italian wardrobe systems). Pure front-end — no backend, no API, no data layer. Deployed as a static site to a custom domain (`hyderabadhardware.com`, see `public/CNAME`) via GitHub Pages.

## Commands

```sh
npm install        # or: bun install (bun.lockb is committed)
npm run dev        # Vite dev server on http://localhost:8080 (host "::")
npm run build      # vite build, then copies dist/index.html -> dist/404.html (SPA fallback)
npm run build:dev  # build in development mode
npm run preview    # serve the production build locally
npm run lint        # eslint over the repo
npm run deploy     # build + publish dist/ to GitHub Pages via gh-pages
```

There is no test suite or test runner configured.

## Stack

React 18 + TypeScript + Vite (SWC via `@vitejs/plugin-react-swc`), Tailwind CSS, React Router v6, Framer Motion + GSAP/ScrollTrigger + Lenis for motion, shadcn/ui-style components on Radix primitives, lucide-react icons.

- `@/*` is aliased to `src/*` (configured in both `vite.config.ts` and `tsconfig`). Always use it for src imports.
- shadcn config lives in `components.json`; new UI primitives land in `src/components/ui`.

## Architecture

**Routing.** `src/main.tsx` mounts `<BrowserRouter basename={import.meta.env.BASE_URL}>`; routes are declared in `src/App.tsx`. Each route is a page under `src/pages/`. Page transitions are animated globally via Framer Motion `AnimatePresence` keyed on `location.pathname` in `App.tsx` — individual pages do not need their own enter/exit transition wrappers. The nav link list is defined in `src/components/layout/Navbar.tsx`; **adding a page means updating both the `<Routes>` in `App.tsx` and that nav array.**

**Page composition.** The home page (`pages/Index.tsx`) is just an ordered stack of section components from `src/components/home/` wrapped in `<Layout>`. `Layout` (`components/layout/Layout.tsx`) provides the shared `Navbar`, `Footer`, floating `WhatsAppButton`, and `ScrollSmooth`, plus the dark `bg-texture` background. Wrap every page in `<Layout>`.

**Scrolling is global and custom.** `components/ScrollSmooth.tsx` (rendered once inside `Layout`) owns a single Lenis instance wired into the GSAP ticker, and re-runs on every route/hash change to reset scroll position (or smooth-scroll to a `#hash` anchor after a ~350ms delay for the page transition). Do not add competing smooth-scroll or `scroll-behavior` logic; use Lenis (`lenis.scrollTo`) or anchor hashes instead. GSAP ScrollTrigger is already registered here.

**Images are auto-discovered via `import.meta.glob`, not hardcoded.** The Gallery (`pages/Gallery.tsx`) and the home hero slideshow (`components/home/HeroSection.tsx`) glob folders under `src/assets/gallery/{ground,blum,astronea}/` and sort numerically by filename. To add/remove showroom photos you just drop/delete files in those folders — no code change. Consequences to respect:
- Files are sorted with `localeCompare(..., { numeric: true })`, so naming like `ground-showroom-1.jpg ... ground-showroom-12.jpg` controls order.
- HeroSection hardcodes an exclusion filter (e.g. `ground-showroom-2`, `ground-showroom-8`) to skip portrait/vertical shots that look bad as full-bleed backgrounds. Check that filter when hero images look wrong.
- The Gallery globs all three folders (`ground`, `blum`, `astronea`) as separate groups; the home `HeroSection` globs only `ground/`.
- See `src/assets/gallery/README.md` for the intended workflow.

**Videos** are static files in `public/videos/` (referenced by absolute path, and listed manually in `Gallery.tsx`'s `videoItems`). Other static public assets: `favicon.png`, `astronea-brochure.pdf`, `robots.txt`, `CNAME`.

**Signature interactive components** (heavier, animation-driven, brand-specific): `components/ui/BlueprintSlider.tsx` (animated mechanical "X-ray" blueprint reveal, used on the Blum & Astronea pages), `components/blum/MotionSimulator.tsx`, `components/astronea/WardrobeVisualizer.tsx`, and `components/ui/StorySlider.tsx`. These are the most complex files in the repo — read them fully before editing.

## Design system

The look is a fixed dark luxury theme; there is no light mode in use. All color comes from CSS custom properties (HSL triples) defined in `src/index.css` and surfaced as Tailwind tokens in `tailwind.config.ts` — **use the semantic Tailwind classes (`bg-background`, `text-primary`, `text-muted-foreground`, `border-border`, `champagne`, `bronze`, `charcoal`) rather than raw hex.** Brand accent is a warm champagne/brass gold.

Custom utilities also live in `index.css` (not Tailwind config): `text-gradient-metal`, `bg-texture`, `bg-grid-pattern`, `animate-float`, `animate-wa-ping`. Typography: headings use `font-serif` (Cormorant Garamond), body uses `font-sans` (Inter); both load from Google Fonts in `index.css`.

## Notes / gotchas

- `vite.config.ts` sets `base: "/"` because the site serves from the apex domain via `CNAME`. If deploying to a GitHub Pages project subpath instead, `base` must change. The `basename` in `main.tsx` follows `import.meta.env.BASE_URL`.
- `build` produces `dist/404.html` as an SPA fallback so deep links (e.g. `/blum`) work on GitHub Pages.
- There is a duplicate top-level `images/` directory (raw source photos) separate from the `src/assets/` images the app actually bundles; only `src/assets/**` is imported by the app. `scratch/` holds one-off helper scripts (e.g. image-renaming) and is not part of the build.
- Both `bun.lockb` and `package-lock.json` are committed; the deploy/dev scripts use npm.
- `vite.config.ts` disables the dev error overlay (`server.hmr.overlay: false`), so build/runtime errors won't surface as a browser overlay during `npm run dev` — watch the terminal instead.
