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

One project, three services:

| Service | Root dir | Notes |
|---|---|---|
| Postgres | — | Railway Postgres template |
| `cms` | `cms` | Env: `DATABASE_URL`, `PAYLOAD_SECRET`, `WEB_URL=https://casazefas.pt`, `MEDIA_DIR=/app/media`. Mount a **volume at `/app/media`** (uploaded images). `start` runs migrations first. Domain: `cms.casazefas.pt`. |
| `web` | `web` | Env: `CMS_URL` (private: `http://${{cms.RAILWAY_PRIVATE_DOMAIN}}:${{cms.PORT}}`), `CMS_PUBLIC_URL=https://cms.casazefas.pt`, `VITE_SITE_URL=https://casazefas.pt`. Domain: `casazefas.pt`. |

First deploy: run `pnpm seed` once against the prod DB (Railway shell or `railway run pnpm seed` in `cms/`) with
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` set — that becomes the editor's login. More users: Admin → Utilizadores.

Schema changes in `cms/`: `pnpm payload migrate:create <name>` and commit the migration.

## Editing

The editor logs in at `<cms-domain>/admin`. Locale switcher (PT/EN/ES) is top right of each document.
Pages = *Globals* ("Página: …"), houses = *Casas*, contacts/menu/footer = *Geral*. Changes go live within ~1 min (CDN cache).
Booking widget: paste the Lodgify embed in *Página: Contactos → Reservas*; while empty, a placeholder (dates + button to WhatsApp) is shown.
