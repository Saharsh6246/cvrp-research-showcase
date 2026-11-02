import { ArrowDown, FileText } from 'lucide-react'
const rnd = (s: number) => () => (s = (s * 16807) % 2147483647) / 2147483647
function network() {
  const r = rnd(7); const centres = [[170, 120], [470, 90], [520, 300], [190, 300]]; const routes: number[][][] = []
  centres.forEach(([cx, cy]) => { const pts: number[][] = []; for (let i = 0; i < 7; i++) pts.push([cx + (r() - .5) * 120, cy + (r() - .5) * 100]); pts.sort((a, b) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b[1] - cy, b[0] - cx)); routes.push(pts) })
  return routes
}
const routes = network(); const D = [340, 200]
export default function Hero() {
  return (
    <section id="top" className="dark relative overflow-hidden bg-maroon pt-24 pb-14 text-cream sm:pt-32 sm:pb-20 md:pt-40">
      <div className="wrap grid min-w-0 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="min-w-0">
          <p className="kicker mb-5">Undergraduate Research Project · LogNiti Lab · IIT Madras</p>
          <h1 className="text-[1.85rem] leading-[1.12] sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-6xl lg:leading-[1.05]">Rethinking Continuous Approximation for CVRP Tour Length Estimation</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:mt-6 sm:text-lg">Developing a more flexible and interpretable mathematical framework for estimating delivery tour lengths across diverse customer distribution environments.</p>
          <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-[12px] text-cream/70">
            <dt className="text-gold">Department</dt><dd className="min-w-0 break-words">Civil Engineering</dd>
            <dt className="text-gold">Institution</dt><dd className="min-w-0 break-words">IIT Madras</dd>
            <dt className="text-gold">Researcher</dt><dd className="min-w-0 break-words">Saharsh Yadav</dd>
            <dt className="text-gold">Supervisor</dt><dd className="min-w-0 break-words">Dr. Anmol Pahwa</dd>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <a href="#problem" className="btn btn-gold w-full sm:w-auto"><ArrowDown size={16} />Explore the Research</a>
            <a href="./UGRP_Final_Report.docx" download className="btn btn-line w-full sm:w-auto"><FileText size={16} />Read the Research Report</a>
          </div>
        </div>
        <svg viewBox="0 0 680 400" className="mx-auto h-auto w-full max-w-xl lg:max-w-none" role="img" aria-label="Abstract vehicle routing network: a central depot connected by routes to four customer clusters">
          {routes.map((pts, i) => { const path = `M${D} ` + pts.map(p => `L${p}`).join(' ') + ` L${D}`; return <g key={i}>
            <path d={path} fill="none" stroke="#CDA447" strokeOpacity=".8" strokeWidth="1.5" className="route" />
            {pts.map((p, j) => <circle key={j} cx={p[0]} cy={p[1]} r="4.5" fill="#FAF6ED" opacity=".92" />)}</g> })}
          <circle cx={D[0]} cy={D[1]} r="16" fill="#CDA447" /><rect x={D[0] - 6} y={D[1] - 6} width="12" height="12" fill="#79251F" />
          <text x={D[0]} y={D[1] + 36} textAnchor="middle" fill="#F2E8D1" fontSize="12" fontFamily="JetBrains Mono">DEPOT</text>
        </svg>
      </div>
    </section>
  )
}
