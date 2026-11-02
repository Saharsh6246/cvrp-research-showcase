import { useEffect, useState } from 'react'
import { ArrowUp, Menu, X } from 'lucide-react'
export const NAV = [['problem','Problem'],['background','Background'],['objectives','Objectives'],['method','Method'],['distributions','Distributions'],['dataset','Dataset'],['alns','ALNS'],['validation','Validation'],['final','Final Data'],['next','Next'],['refs','References']]
export default function Navbar() {
  const [active, setActive] = useState(''); const [open, setOpen] = useState(false); const [top, setTop] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    const sc = () => setTop(window.scrollY > 800); window.addEventListener('scroll', sc, { passive: true })
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => { io.disconnect(); window.removeEventListener('scroll', sc); window.removeEventListener('resize', close) }
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  return (<>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/30 bg-burgundy/95 backdrop-blur">
      <div className="wrap flex h-14 items-center justify-between gap-3">
        <a href="#top" className="shrink-0 font-serif text-base text-cream sm:text-lg">CVRP <span className="text-gold">· CA Extension</span></a>
        <nav className="hidden min-w-0 flex-wrap items-center justify-end gap-x-3 gap-y-1 xl:flex">{NAV.map(([id, l]) => <a key={id} href={`#${id}`} className={`whitespace-nowrap text-[13px] transition ${active === id ? 'text-gold' : 'text-cream/70 hover:text-cream'}`}>{l}</a>)}</nav>
        <button className="-mr-1 p-2 text-cream xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="wrap grid max-h-[calc(100dvh-3.5rem)] grid-cols-2 gap-x-4 gap-y-1 overflow-y-auto pb-5 pt-1 xl:hidden">{NAV.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="py-2 text-cream/80">{l}</a>)}</nav>}
    </header>
    {top && <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-4 right-4 z-50 rounded-sm bg-gold p-3 text-char shadow-lg sm:bottom-6 sm:right-6"><ArrowUp size={18} /></button>}
  </>)
}
