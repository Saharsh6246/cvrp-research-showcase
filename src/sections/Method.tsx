import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { Section, Reveal, Counter, Tex } from '../components/ui'
import { pipeline, stats, seeds } from '../data/dataset'
import { spatial, demand, Dist } from '../data/distributions'
import DatasetMatrix from '../components/DatasetMatrix'
import spatialImg from '../assets/spatial.png'
import demandImg from '../assets/demand.png'
import { Eq } from '../components/ui'

const G: Record<string, string> = { data: 'bg-pale text-char', opt: 'bg-gold/40 text-char', val: 'bg-maroon text-cream' }
export const Methodology = () => {
  const [open, setOpen] = useState(0)
  return (
    <Section id="method" kicker="04 · Methodology overview" title="From Distribution Generation to Validated Data" alt>
      <div className="mb-6 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-wider">
        <span className="flex items-center gap-2"><i className="h-3 w-3 bg-pale ring-1 ring-char/30" />Data generation</span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 bg-gold/40" />Optimisation</span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 bg-maroon" />Validation / output</span></div>
      <ol className="grid gap-3 md:grid-cols-2">
        {pipeline.map((p, i) => (<li key={p.t}><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className={`w-full p-5 text-left transition ${G[p.g]} ${open === i ? 'ring-2 ring-gold' : ''}`}>
          <div className="flex items-start justify-between gap-3"><span className="flex min-w-0 items-start gap-3"><span className="mt-1 shrink-0 font-mono text-xs opacity-60">{String(i + 1).padStart(2, '0')}</span><span className="min-w-0 font-serif text-lg sm:text-xl">{p.t}</span></span><span className="mt-1 shrink-0">{open === i ? <Minus size={16} /> : <Plus size={16} />}</span></div>
          {open === i && <p className="mt-3 text-sm leading-relaxed opacity-90">{p.d}</p>}
          {i < pipeline.length - 1 && <span className="sr-only">then</span>}</button></li>))}
      </ol>
      <p className="mt-4 font-mono text-xs text-char/60">Steps 1–5 build the data, 6–7 optimise it, and 8 is the validated output. The step numbering also reads left to right, then top to bottom.</p>
    </Section>)
}

const Explorer = ({ title, list, img, caption }: { title: string; list: Dist[]; img: string; caption: string }) => {
  const [k, setK] = useState(0); const d = list[k]
  return (<div className="mt-8">
    <h3 className="mb-4 text-2xl text-maroon sm:text-3xl">{title}</h3>
    <div className="grid min-w-0 gap-8 lg:grid-cols-[1.1fr_1fr]">
      <figure><img src={img} alt={caption} loading="lazy" className="w-full border border-char/15 bg-white" /><figcaption className="mt-2 font-mono text-[11px] text-char/60">{caption}</figcaption></figure>
      <div>
        <div role="tablist" className="mb-5 flex flex-wrap gap-2">{list.map((x, i) => <button key={x.id} role="tab" aria-selected={i === k} onClick={() => setK(i)}
          className={`rounded-sm border px-3 py-1.5 text-sm transition ${i === k ? 'border-maroon bg-maroon text-cream' : 'border-char/25 hover:border-maroon'}`}>{x.name}{x.isNew && <span className="ml-1.5 text-gold">★</span>}</button>)}</div>
        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3"><h4 className="text-xl text-maroon sm:text-2xl">{d.name}</h4><span className="chip"><Tex t={d.abbr} /></span>{d.isNew && <span className="tag-future !text-maroon !border-maroon/40">New this semester</span>}</div>
        <Eq tex={d.latex} />
        {d.note && <p className="-mt-3 mb-3 font-mono text-[11px] text-char/60">{d.note}</p>}
        <p className="text-sm leading-relaxed text-char/80">{d.what}</p>
      </div></div></div>)
}
export const Distributions = () => (
  <Section id="distributions" kicker="05 · Distribution environment design" title="Expanding the Distribution Space">
    <Reveal><p className="lead max-w-3xl">Six spatial and six demand families, two of each introduced this semester (marked ★). The spatial and demand definitions of Multi-Cluster and Beta are <b>different</b>, so each is shown separately below with the report’s exact parameterisation. Plots are the report’s original figures.</p></Reveal>
    <Explorer title="A. Customer spatial distributions" list={spatial} img={spatialImg} caption="Fig. 1 (report). Customer spatial dispersion, illustrative instances on a unit square, lx = ly = 1; depot not shown." />
    <div className="my-12 border-t border-char/15" />
    <Explorer title="B. Customer demand distributions" list={demand} img={demandImg} caption="Fig. 2 (report). Customer demand pattern, probability density." />
  </Section>)

export const Dataset = () => (
  <Section id="dataset" kicker="06 · Synthetic dataset generation" title="Building the Dataset" alt>
    <Reveal><div className="mb-10 border-y-2 border-maroon px-1 py-5 text-center font-serif text-lg leading-snug text-maroon sm:px-0 sm:py-6 sm:text-2xl md:text-3xl"><div>6 Spatial × 6 Demand = 36 Environment Configurations</div><div className="mt-2 text-char/80">36 × 30 Instances per Configuration = 1,080 CVRP Instances</div></div></Reveal>
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5 md:gap-6">{stats.map(s => <Counter key={s.label} to={s.value} label={s.label} />)}</div>
    <div className="mt-14 grid gap-10 lg:grid-cols-2">
      <div><h3 className="mb-4 text-2xl text-maroon">The 6 × 6 combination matrix</h3><DatasetMatrix /></div>
      <div className="space-y-4 text-[15px] leading-relaxed text-char/80">
        <h3 className="text-2xl text-maroon">Fixed seeds and controlled comparison</h3>
        <p>Each instance fixes a service region <Tex t="l_x\times l_y" /> (each from 1 to 9), a customer count <Tex t="n\in[100,500]" />, a vehicle capacity <Tex t="q_v\in\{10,20,\ldots,100\}" /> and a depot position with <Tex t="\rho_x/l_x,\rho_y/l_y\in\{-1.0,-0.9,\ldots,1.0\}" />, so the depot can lie inside or outside the region.</p>
        <p><b>Checkpoint seeding</b> keeps <Tex t="(l_x,l_y,\rho_x,\rho_y,q_v,n)" /> identical across all 36 distribution pairs for a given seed. The dataset therefore has 30 distinct macro-parameter sets, each paired with all 36 distribution combinations. Fixed seeds make every instance reproducible, and the effect of the distribution pattern alone can be isolated.</p>
        <p className="font-mono text-xs text-char/60">Coordinates use a distance unit of measure (e.g. km or miles); demand and capacity use a load unit (e.g. parcels, weight or volume).</p>
      </div></div>
  </Section>)
