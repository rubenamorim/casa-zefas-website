# Agent notes

## Payload v4 beta workarounds

Pinned to `4.0.0-beta.3`. On each Payload bump (and when v4 goes stable), recheck each item: drop the workaround if fixed upstream.

- [ ] **Migration imports**: `payload migrate:create` emits `import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'`; Node strip-types fails on non-`type` imports. Hand-fix first line to `import { type MigrateUpArgs, type MigrateDownArgs, sql } ...` in every new migration (`web/src/payload/migrations/`).
- [ ] **Nitro traceDeps**: `web/vite.config.ts` adds `file-type*`, `strtok3*`, `token-types*`, `@tokenizer*` to `traceDeps`. Without them prod `/api/media/file/*` 500s (`Cannot find package 'strtok3'`). Test: remove, `pnpm build && pnpm start`, fetch an image.
- [ ] **sharp pin**: `sharp` pinned to `0.35.4` to match `@payloadcms/transformer-sharp` (else duplicate libvips). Bump together.
- [ ] **Dev media 404**: `pnpm dev` returns 404 on `/api/media/file/*` (vite intercepts); prod fine. No workaround; recheck.
- [ ] **Variant format**: `formatOptions: webp` in `payload.config.ts` yields jpg variants (only original is webp). Recheck.
- [ ] **Hidden field in list**: `seedKey` (`admin.hidden`) still shows as column in admin Media list. Recheck.
- [ ] **Admin UI language**: admin chrome showed English in an English browser despite `fallbackLanguage: 'pt'`; verify PT browser gets PT.
