# Theo’s Cozy Corner redesign

An independent responsive website concept for Theo’s Cozy Corner in Boston’s North End. Restaurant facts are based on the reference listing supplied for the project; confirm current hours, menu, and payment details directly with the restaurant before relying on them.

## Run locally

From this folder:

```bash
pnpm install
pnpm dev
```

Open the local address printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
pnpm build
pnpm preview
```

Vite writes production files to `dist/`. On Vercel, use `pnpm build` and `dist` as the output directory.

## Project notes

- The two supplied Theo’s Cozy Corner photos are stored in `public/images/` and served locally.
- Two additional restaurant gallery photos are linked from the restaurant reference listing.
- The menu shows named highlights only; it intentionally omits prices and unverified descriptions.
- This is an independent redesign concept and is not the restaurant’s official website.
