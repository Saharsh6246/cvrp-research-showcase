import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Section, Reveal, Tex, Eq } from '../components/ui'
import { alnsSteps, params, removal, insertion, localSearch } from '../data/dataset'

export const Alns = () => {
  const [s, setS] = useState(0)
  return (
    <Section id="alns" kicker="07 · ALNS optimisation" title="Obtaining Optimised Tour Lengths">
      <Reveal><p className="lead max-w-3xl">The purpose of this stage is to obtain <b>high-quality tour-length values</b> for every synthetic instance. The solver is an updated version of the CVRP.jl ALNS library, implemented in Julia, following the ruin-and-recreate framework of Ropke and Pisinger (2006).</p></Reveal>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="card">
          <p className="kicker mb-4">Interactive workflow · step {s + 1} of {alnsSteps.length}</p>
          <ol className="space-y-1.5">{alnsSteps.map((a, i) => <li key={a.t}><button onClick={() => setS(i)} className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition ${i === s ? 'bg-maroon text-cream' : 'hover:bg-pale'}`}>
            <span className="font-mono text-xs opacity-70">{i + 1}</span>{a.t}</button></li>)}</ol>
          <div className="mt-5 flex gap-2"><button className="btn btn-maroon !px-3 !py-2" aria-label="Previous step" onClick={() => setS(Math.max(0, s - 1))}><ChevronLeft size={16} /></button>
            <button className="btn btn-maroon !px-3 !py-2" aria-label="Next step" onClick={() => setS(Math.min(alnsSteps.length - 1, s + 1))}><ChevronRight size={16} /></button></div>
        </div>
        <div className="card flex flex-col justify-center border-l-4 border-l-gold">
          <p className="font-mono text-xs text-gold">STEP {s + 1}</p><h3 className="my-2 text-3xl text-maroon">{alnsSteps[s].t}</h3><p className="leading-relaxed text-char/80">{alnsSteps[s].d}</p>
          {s === 4 && <Eq tex={String.raw`\lambda < \exp\!\left(\frac{f(s)-f(s')}{T}\right)`} caption="Boltzmann acceptance of a worse solution" />}
          {s === 5 && <Eq tex={String.raw`w \leftarrow \rho\,\frac{\pi}{c} + (1-\rho)\,w`} caption="Operator weight update at the end of a segment" vars={[['\\pi', 'operator score in the segment'], ['c', 'operator usage count'], ['\\rho', 'reaction factor (0.1)']]} />}
        </div>
      </div>
      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        <div className="card"><p className="kicker mb-3">Removal operators · 9</p><div className="flex flex-wrap gap-1.5">{removal.map(x => <span key={x} className="chip">{x}</span>)}</div>
          <p className="mt-3 text-xs text-char/60">Criterion (random, related, worst) × granularity (node, arc, segment).</p></div>
        <div className="card"><p className="kicker mb-3">Insertion operators · 10</p><div className="flex flex-wrap gap-1.5">{insertion.map(x => <span key={x} className="chip">{x}</span>)}</div>
          <p className="mt-3 text-xs text-char/60">Heuristic (best, greedy, regret-2/3/5) × mode (precise, perturb).</p></div>
        <div className="card"><p className="kicker mb-3">Local search · 6</p><div className="flex flex-wrap gap-1.5">{localSearch.map(x => <span key={x} className="chip">{x}</span>)}</div>
          <p className="mt-3 text-xs text-char/60">Intra- or inter-route scope × move, swap or opt (2-opt).</p></div>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div><h3 className="mb-3 text-2xl text-maroon">Calibrated parameters</h3>
          <table className="t"><thead><tr><th>Parameter</th><th>Dataset generation</th><th>Validation</th></tr></thead><tbody>{params.map(r => <tr key={r[0]}><td>{r[0]}</td><td className="font-mono text-xs">{r[1]}</td><td className="font-mono text-xs">{r[2]}</td></tr>)}</tbody></table>
          <p className="mt-3 text-xs text-char/60">Validation used a larger budget (j = 200, k = 10) than dataset generation (j = 100, k = 5), as stated in the report.</p></div>
        <div className="space-y-3 text-sm leading-relaxed text-char/80"><h3 className="mb-1 text-2xl text-maroon">Annealing and removal size</h3>
          <p>Removed elements per ruin step: between <Tex t="\min(5,\,0.05x)" /> and <Tex t="\min(30,\,0.30x)" />, with <Tex t="x=\max(100,|N|)" />.</p>
          <p>Initial temperature parameters <Tex t="\bar\omega = 1/x" />, <Tex t="\bar\tau = 10\%" />; cooling exponentially towards <Tex t="\underline\omega = 0.1/x" />, <Tex t="\underline\tau = 1\%" />.</p>
          <Eq tex={String.raw`T_0=\frac{\bar\omega\, f(s^*)}{\ln(1/\bar\tau)}`} caption="Initial temperature" />
          <p>Every <Tex t="k" /> segments the current solution resets to the best if no new best was found. Solutions are hashed for novelty, and the objective is Euclidean distance plus proportional capacity-violation penalties.</p></div>
      </div>
    </Section>)
}
