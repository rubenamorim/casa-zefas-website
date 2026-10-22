// Seeds the CMS with the content from the design. Run once: `pnpm seed`.
// Idempotent: re-running overwrites page texts, reuses already-uploaded images.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

import pt from './pt'

type Locale = 'pt' | 'en' | 'es'
type Json = any // eslint-disable-line @typescript-eslint/no-explicit-any

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'images')
const payload = await getPayload({ config })
const mediaIds = new Map<string, string | number | null>()

async function media(file: string) {
  if (mediaIds.has(file)) return mediaIds.get(file)!
  const existing = await payload.find({ overrideAccess: true, collection: 'media', where: { seedKey: { equals: file } }, limit: 1 })
  let id: string | number | null = existing.docs[0]?.id ?? null
  const filePath = path.join(dir, file)
  if (!id && fs.existsSync(filePath)) {
    const alt = file.replace(/\.\w+$/, '').replace(/-/g, ' ')
    id = (await payload.create({ overrideAccess: true, collection: 'media', data: { alt, seedKey: file }, filePath })).id
  }
  if (!id) payload.logger.warn(`Image missing, skipped: ${file} (drop it in src/payload/seed/images)`)
  mediaIds.set(file, id)
  return id
}

// Replace every "img:<file>" string with the uploaded media id.
async function resolve(value: Json): Promise<Json> {
  if (typeof value === 'string' && value.startsWith('img:')) return media(value.slice(4))
  if (Array.isArray(value)) {
    const out = []
    for (const v of value) out.push(await resolve(v)) // sequential: avoids double uploads
    return value.every((v) => typeof v === 'string' && v.startsWith('img:')) ? out.filter(Boolean) : out
  }
  if (value && typeof value === 'object') {
    const out: Json = {}
    for (const [k, v] of Object.entries(value)) out[k] = await resolve(v)
    return out
  }
  return value
}

// Translated content must reuse the array row ids of the PT document, otherwise
// Payload treats the rows as new and drops the PT values.
function withIds(base: Json, over: Json): Json {
  if (Array.isArray(over)) return over.map((o, i) => withIds(base?.[i], o))
  if (over && typeof over === 'object') {
    const out: Json = base?.id ? { id: base.id } : {}
    for (const [k, v] of Object.entries(over)) out[k] = withIds(base?.[k], v)
    return out
  }
  return over
}

async function loadLocale(locale: Exclude<Locale, 'pt'>) {
  try {
    return (await import(`./${locale}.ts`)).default as typeof pt
  } catch {
    payload.logger.warn(`No ${locale}.ts seed file, skipping ${locale}`)
    return null
  }
}

const translations = { en: await loadLocale('en'), es: await loadLocale('es') }
const globals = ['site', 'home', 'stay', 'house', 'geres', 'gallery', 'contact'] as const

for (const slug of globals) {
  const base = await payload.updateGlobal({ overrideAccess: true, slug, locale: 'pt', data: await resolve(pt[slug]), depth: 0 })
  for (const [locale, content] of Object.entries(translations)) {
    if (!content) continue
    await payload.updateGlobal({ overrideAccess: true, slug, locale: locale as Locale, data: withIds(base, await resolve(content[slug])) })
  }
  payload.logger.info(`Seeded global: ${slug}`)
}

for (const [i, unit] of pt.units.entries()) {
  const found = await payload.find({ overrideAccess: true, collection: 'units', where: { order: { equals: unit.order } }, limit: 1 })
  const data = await resolve(unit)
  const base = found.docs[0]
    ? await payload.update({ overrideAccess: true, collection: 'units', id: found.docs[0].id, locale: 'pt', data, depth: 0 })
    : await payload.create({ overrideAccess: true, collection: 'units', locale: 'pt', data, depth: 0 })
  for (const [locale, content] of Object.entries(translations)) {
    if (!content) continue
    const tr = await resolve(content.units[i])
    await payload.update({ overrideAccess: true, collection: 'units', id: base.id, locale: locale as Locale, data: withIds(base, tr) })
  }
  payload.logger.info(`Seeded unit: ${unit.name}`)
}

const { SEED_ADMIN_EMAIL: email, SEED_ADMIN_PASSWORD: password } = process.env
if (email && password) {
  const exists = await payload.find({ overrideAccess: true, collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (!exists.docs.length) {
    await payload.create({ overrideAccess: true, collection: 'users', data: { email, password } })
    payload.logger.info(`Created editor account: ${email}`)
  }
}

process.exit(0)
