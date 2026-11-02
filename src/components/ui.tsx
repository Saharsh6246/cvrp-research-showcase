import { ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import katex from 'katex'

export const Reveal = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>{children}</motion.div>
)

export const Section = ({ id, kicker, title, children, dark = false, alt = false }: { id: string; kicker: string; title: string; children: ReactNode; dark?: boolean; alt?: boolean }) => (
  <section id={id} className={`py-20 md:py-28 ${dark ? 'dark bg-maroon text-cream' : alt ? 'bg-pale/50' : ''}`}>
    <div className="wrap">
      <Reveal><p className="kicker mb-3">{kicker}</p><h2 className="h2 max-w-3xl">{title}</h2></Reveal>
      <div className="mt-10">{children}</div>
    </div>
  </section>
)

export const Eq = ({ tex, caption, vars }: { tex: string; caption?: string; vars?: [string, string][] }) => (
  <div className="my-6">
    <div className="eqblock text-char" dangerouslySetInnerHTML={{ __html: katex.renderToString(tex, { displayMode: true, throwOnError: false }) }} />
    {caption && <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-char/60">{caption}</p>}
    {vars && <dl className="mt-3 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">{vars.map(([k, v]) => (
      <div key={k} className="flex gap-2"><dt className="min-w-[3rem] text-maroon" dangerouslySetInnerHTML={{ __html: katex.renderToString(k, { throwOnError: false }) }} /><dd className="text-char/75">{v}</dd></div>))}</dl>}
  </div>
)

export const Tex = ({ t }: { t: string }) => <span dangerouslySetInnerHTML={{ __html: katex.renderToString(t, { throwOnError: false }) }} />

export const Counter = ({ to, label }: { to: number; label: string }) => {
  const ref = useRef(null); const inView = useInView(ref, { once: true }); const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t0 = performance.now(); let raf = 0
    const tick = (t: number) => { const p = Math.min((t - t0) / 1400, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
  }, [inView, to])
  return <div ref={ref} className="border-t-2 border-gold pt-3"><div className="font-serif text-5xl text-maroon">{v.toLocaleString('en-US')}</div><div className="mt-1 text-sm text-char/70">{label}</div></div>
}

export const Tag = ({ future }: { future?: boolean }) => <span className={future ? 'tag-future' : 'tag-done'}>{future ? 'Planned' : 'Completed'}</span>
