# Villa Zefas website

- `web/` — public site. TanStack Start + Tailwind v4, SSR, PT (default, `/`) / EN (`/en`) / ES (`/es`). Slugs are English in every language (`/stay`, `/house`, `/geres`, `/gallery`, `/contact`).
- `cms/` — Payload CMS (Next.js + Postgres). Every text and image on the site is edited here, per language.

## Local dev

```sh
docker run -d --name vz-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=villa_zefas -p 5433:5432 postgres:17-alpine

cd cms && pnpm i
cp .env.example .env            # fill in values
pnpm seed                       # loads design content (PT/EN/ES) + creates SEED_ADMIN_EMAIL user
pnpm dev                        # http://localhost:3001/admin

cd ../web && pnpm i && pnpm dev # http://localhost:3000
```

Photos: drop the design's `assets/*.jpg` into `cms/src/seed/images/` before `pnpm seed`
(missing images are skipped — they can also be uploaded later in the admin).

## Deploy (Railway)

Infra is code: `.railway/railway.ts` (Postgres, `media` bucket, `cms`, `web`, domains, env).

```sh
pnpm i && railway login && railway link
railway config plan    # preview
railway config apply
```

Set `PAYLOAD_SECRET` on the `cms` service once in the Railway dashboard (kept via `preserve()`, never in git).
DNS: point `casazefas.pt` and `cms.casazefas.pt` at the records Railway shows for each domain.

First deploy: run `pnpm seed` once against the prod DB (Railway shell or `railway run pnpm seed` in `cms/`) with
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` set — that becomes the editor's login. More users: Admin → Utilizadores.

Schema changes in `cms/`: `pnpm payload migrate:create <name>` and commit the migration.

## Editing

The editor logs in at `<cms-domain>/admin`. Locale switcher (PT/EN/ES) is top right of each document.
Pages = *Globals* ("Página: …"), houses = *Casas*, contacts/menu/footer = *Geral*. Changes go live within ~1 min (CDN cache).
Booking widget: paste the Lodgify embed in *Página: Contactos → Reservas*; while empty, a placeholder (dates + button to WhatsApp) is shown.
