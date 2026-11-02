import { Fragment, useState } from 'react'
import { spatial, demand } from '../data/distributions'
export default function DatasetMatrix() {
  const [h, setH] = useState<[number, number] | null>(null)
  return (<div className="card">
    <div className="grid grid-cols-[auto_repeat(6,1fr)] gap-1 text-center text-[11px]">
      <div className="p-1 font-mono text-[10px] text-char/50">spatial ↓ / demand →</div>
      {demand.map(d => <div key={d.id} className="p-1 font-mono text-maroon">{d.id}<sub>d</sub></div>)}
      {spatial.map((s, i) => (<Fragment key={s.id}>
        <div className="flex items-center justify-end p-1 pr-2 font-mono text-maroon">{s.id}<sub>s</sub></div>
        {demand.map((d, j) => <button key={d.id} onMouseEnter={() => setH([i, j])} onFocus={() => setH([i, j])} onMouseLeave={() => setH(null)} aria-label={`${s.name} spatial with ${d.name} demand`}
          className={`aspect-square rounded-[2px] border transition ${h && (h[0] === i && h[1] === j) ? 'border-gold bg-gold' : h && (h[0] === i || h[1] === j) ? 'border-maroon/30 bg-maroon/25' : 'border-maroon/20 bg-maroon/10'} ${(s.isNew || d.isNew) ? 'ring-1 ring-inset ring-gold/60' : ''}`} />)}
      </Fragment>))}
    </div>
    <p className="mt-4 min-h-[3rem] font-mono text-[13px] text-char/80">{h ? <><b className="text-maroon">{spatial[h[0]].name}</b> spatial × <b className="text-maroon">{demand[h[1]].name}</b> demand · 30 seeds → 30 instances</> : 'Hover a cell to see its combination. Gold-ringed cells involve a newly introduced Multi-Cluster or Beta (U-shaped) distribution.'}</p>
  </div>)
}
