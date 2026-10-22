import { useEffect, useState } from 'react'

import type { Media } from '#/lib/cms'

export function Lightbox({ title, photos, start = 0, onClose }: { title?: string | null; photos: Media[]; start?: number; onClose: () => void }) {
  const [i, setI] = useState(start)
  const n = photos.length
  const step = (d: number) => setI((x) => (x + d + n) % n)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const cur = photos[i]
  const arrow =
    'flex-none size-[clamp(42px,5vw,56px)] cursor-pointer rounded-full border border-[rgba(244,237,224,.4)] bg-[rgba(244,237,224,.06)] text-[22px] leading-none text-linen transition-colors hover:bg-[rgba(244,237,224,.16)]'
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? undefined}
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex flex-col bg-[rgba(16,22,19,.93)] p-[clamp(16px,3vw,40px)] backdrop-blur-sm"
    >
      <div className="flex flex-none items-center justify-between">
        <span className="font-serif text-[clamp(20px,3vw,28px)] text-linen">{title}</span>
        <button type="button" onClick={onClose} aria-label="Close" className="cursor-pointer border-none bg-transparent px-2.5 py-1 font-sans text-[34px] leading-none text-linen">
          ×
        </button>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="my-[clamp(12px,2vw,24px)] flex min-h-0 flex-1 items-center justify-center gap-[clamp(10px,2vw,24px)]">
        <button type="button" onClick={() => step(-1)} aria-label="Previous" className={arrow}>
          ‹
        </button>
        <div className="flex h-full flex-1 items-center justify-center">
          {cur && (
            <img
              src={cur.variants?.xl?.url || cur.url!}
              alt={cur.alt ?? ''}
              className="max-h-full max-w-full rounded-[3px] object-contain shadow-[0_24px_60px_-28px_rgba(0,0,0,.7)]"
            />
          )}
        </div>
        <button type="button" onClick={() => step(1)} aria-label="Next" className={arrow}>
          ›
        </button>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="flex flex-none flex-col items-center gap-3.5">
        <span className="font-sans text-xs tracking-[.18em] text-[rgba(244,237,224,.7)]">
          {i + 1} / {n}
        </span>
        <div className="flex max-w-[680px] flex-wrap justify-center gap-2">
          {photos.map((p, j) => (
            <button
              type="button"
              key={p.id}
              onClick={() => setI(j)}
              aria-label={`${j + 1}`}
              className={`h-[clamp(34px,4.5vw,46px)] w-[clamp(44px,6vw,64px)] cursor-pointer overflow-hidden rounded-[2px] border-2 bg-transparent p-0 transition-opacity ${
                j === i ? 'border-linen opacity-100' : 'border-transparent opacity-50'
              }`}
            >
              <img src={p.variants?.thumb?.url || p.url!} alt="" className="block size-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
