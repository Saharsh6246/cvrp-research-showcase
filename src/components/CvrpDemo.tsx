import { useMemo, useState } from 'react'
// Illustrative only: not data from the report. Customers are generated from a fixed seed; routes use a simple angular sweep.
const rnd = (s: number) => () => (s = (s * 16807) % 2147483647) / 2147483647
const depot = [300, 190]; const COL = ['#79251F', '#CDA447', '#332B29', '#9a5b3f', '#8a7a3a', '#5c4a45', '#b0553b', '#6e6a2a']
export default function CvrpDemo() {
  const [cap, setCap] = useState(12)
  const cust = useMemo(() => { const r = rnd(42); return Array.from({ length: 26 }, () => { const a = r() * 6.283, d = 50 + r() * 130; return { x: depot[0] + Math.cos(a) * d * 1.5, y: depot[1] + Math.sin(a) * d * .95, q: 1 + Math.floor(r() * 3), a } }).sort((p, q) => p.a - q.a) }, [])
  const routes = useMemo(() => { const out: typeof cust[] = []; let cur: typeof cust = [], load = 0
    cust.forEach(c => { if (load + c.q > cap) { out.push(cur); cur = []; load = 0 } cur.push(c); load += c.q }); if (cur.length) out.push(cur); return out }, [cust, cap])
  const len = (r: typeof cust) => { let t = 0, p = depot; r.forEach(c => { t += Math.hypot(c.x - p[0], c.y - p[1]); p = [c.x, c.y] }); return t + Math.hypot(p[0] - depot[0], p[1] - depot[1]) }
  const total = routes.reduce((s, r) => s + len(r), 0) / 100
  return (
    <div className="card grid min-w-0 gap-6 md:grid-cols-[1.4fr_1fr]">
      <svg viewBox="0 0 600 380" className="h-auto w-full min-w-0 rounded-sm bg-cream" role="img" aria-label="Interactive CVRP illustration">
        {routes.map((r, i) => <polyline key={i} fill="none" stroke={COL[i % COL.length]} strokeWidth="1.8" points={[depot, ...r.map(c => [c.x, c.y]), depot].map(p => p.join(',')).join(' ')} />)}
        {routes.map((r, i) => r.map((c, j) => <circle key={`${i}-${j}`} cx={c.x} cy={c.y} r={3 + c.q * 1.3} fill={COL[i % COL.length]} opacity=".85" />))}
        <rect x={depot[0] - 9} y={depot[1] - 9} width="18" height="18" fill="#79251F" /><text x={depot[0]} y={depot[1] + 28} textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fill="#332B29">DEPOT</text>
      </svg>
      <div className="flex flex-col justify-center gap-4 text-sm">
        <label className="font-mono text-[11px] uppercase tracking-wider text-maroon">Vehicle capacity q<sub>v</sub> = {cap}
          <input type="range" min={6} max={40} value={cap} onChange={e => setCap(+e.target.value)} className="mt-2 w-full accent-[#79251F]" aria-label="Vehicle capacity" /></label>
        <div className="grid grid-cols-2 gap-3"><div className="border-t-2 border-gold pt-2"><div className="font-serif text-3xl text-maroon">{routes.length}</div>routes (vehicles)</div>
          <div className="border-t-2 border-gold pt-2"><div className="font-serif text-3xl text-maroon">{total.toFixed(1)}</div>total length (arbitrary units)</div></div>
        <p className="text-char/70">Dot size shows customer demand. Lower capacity means more routes and more trips back to the depot. Larger dots need more of a vehicle’s capacity.</p>
        <p className="font-mono text-[10.5px] text-char/50">Illustration only: random customers, simple angular-sweep routes. Not data from the research.</p>
      </div>
    </div>)
}
