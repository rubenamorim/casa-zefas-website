# Villa Zefas website

One TanStack Start app in `web/` (Tailwind v4, SSR) with Payload CMS v4 embedded:

- Site: PT (default, `/`) / EN (`/en`) / ES (`/es`). Slugs are English in every language (`/stay`, `/house`, `/geres`, `/gallery`, `/contact`).
- Admin: `/admin`. Every text and image on the site is edited there, per language. API: `/api`.
- Payload config, collections, globals, migrations and seed: `web/src/payload/`.

## Local dev

Requires Node ≥ 24.15.

```sh
docker run -d --name vz-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=villa_zefas -p 5433:5432 postgres:17-alpine

cd web && pnpm i
cp .env.example .env            # fill in values
pnpm payload migrate            # create tables
pnpm seed                       # loads design content (PT/EN/ES) + creates SEED_ADMIN_EMAIL user
pnpm dev                        # http://localhost:3000 (admin: /admin)
```

Photos: drop the design's `assets/*.jpg` into `web/src/payload/seed/images/` before `pnpm seed`
(missing images are skipped — they can also be uploaded later in the admin).

## Deploy (Railway)

Infra is code: `.railway/railway.ts` (Postgres, `media` bucket, `web` service, domain, env).

```sh
pnpm i && railway login && railway link
railway config plan    # preview
railway config apply
```

Set `PAYLOAD_SECRET` on the `web` service once in the Railway dashboard (kept via `preserve()`, never in git).
DNS: point `casazefas.pt` at the records Railway shows.

First deploy: run `pnpm seed` once against the prod DB (`railway run pnpm seed` in `web/`) with
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` set — that becomes the editor's login. More users: Admin → Utilizadores.

Schema changes: `pnpm payload migrate:create <name>` and commit the migration (`pnpm start` applies it).
Dev never auto-pushes schema (`push: false`), so run `pnpm payload migrate` locally too.

## Editing

The editor logs in at `https://casazefas.pt/admin`. Locale switcher (PT/EN/ES) is top right of each document.
Pages = *Globals* ("Página: …"), houses = *Casas*, contacts/menu/footer = *Geral*. Every save keeps a version (undo via *Versions*).
Changes go live within ~1 min (CDN cache).
Booking widget: paste the Lodgify embed in *Página: Contactos → Reservas*; while empty, a placeholder (dates + button to WhatsApp) is shown.
