import { useEffect, useState } from 'react'
import { ArrowUp, Menu, X } from 'lucide-react'
export const NAV = [['problem','Problem'],['background','Background'],['objectives','Objectives'],['method','Method'],['distributions','Distributions'],['dataset','Dataset'],['alns','ALNS'],['validation','Validation'],['final','Final Data'],['next','Next'],['refs','References']]
export default function Navbar() {
  const [active, setActive] = useState(''); const [open, setOpen] = useState(false); const [top, setTop] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    const sc = () => setTop(window.scrollY > 800); window.addEventListener('scroll', sc)
    return () => { io.disconnect(); window.removeEventListener('scroll', sc) }
  }, [])
  return (<>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/30 bg-burgundy/95 backdrop-blur">
      <div className="wrap flex h-14 items-center justify-between">
        <a href="#top" className="font-serif text-lg text-cream">CVRP <span className="text-gold">· CA Extension</span></a>
        <nav className="hidden gap-5 lg:flex">{NAV.map(([id, l]) => <a key={id} href={`#${id}`} className={`text-[13px] transition ${active === id ? 'text-gold' : 'text-cream/70 hover:text-cream'}`}>{l}</a>)}</nav>
        <button className="text-cream lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="wrap flex flex-col gap-3 pb-4 lg:hidden">{NAV.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="text-cream/80">{l}</a>)}</nav>}
    </header>
    {top && <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-50 rounded-sm bg-gold p-3 text-char shadow-lg"><ArrowUp size={18} /></button>}
  </>)
}
