import { Section, Reveal, Tex, Tag } from '../components/ui'
import { quartiles, seeds } from '../data/dataset'
import boxImg from '../assets/boxplot.png'
import convImg from '../assets/convergence.png'
import { ArrowRight } from 'lucide-react'

const big = [['1.05%', 'Median Minimum Gap'], ['1.57%', 'Median Mean Gap'], ['2.07%', 'Median Maximum Gap']]
export const Validation = () => (
  <Section id="validation" kicker="08 · Benchmark validation and results" title="Validating the Optimisation Framework" alt>
    <Reveal><p className="lead max-w-3xl">Before generating ground-truth tour lengths, the solver was tested on <b>68 CVRPLIB X-series instances</b> (Uchoa et al., 2017; X-n101-k25 to X-n491-k59, 100 to 490 customers), each solved with <b>10 independent seeds</b>: <b>680 validation runs</b>. Each run is compared with the published Best-Known Solution (BKS).</p></Reveal>
    <div className="my-10 grid gap-px overflow-hidden border border-maroon/30 bg-maroon/30 md:grid-cols-3">
      {big.map(([n, l]) => <div key={l} className="bg-maroon px-5 py-7 text-cream sm:px-8 sm:py-10"><div className="font-serif text-4xl text-gold sm:text-5xl md:text-6xl lg:text-7xl">{n}</div><div className="mt-2 font-mono text-[10px] uppercase tracking-widest sm:text-xs">{l}</div></div>)}
    </div>
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <figure><img src={boxImg} alt="Box plot of minimum, mean and maximum deviation from the Best-Known Solutions" className="w-full border border-char/15 bg-white" loading="lazy" />
        <figcaption className="mt-2 font-mono text-[11px] text-char/60">Fig. 4 (report). Box plot of deviation from the best, across the 68 instances.</figcaption></figure>
      <div>
        <div className="scroll-x"><table className="t"><thead><tr><th>Quartile</th><th>Min gap</th><th>Mean gap</th><th>Max gap</th></tr></thead><tbody>{quartiles.map(r => <tr key={r[0]} className={r[0] === 'Median' ? 'bg-gold/20 font-medium' : ''}>{r.map((c, i) => <td key={i} className={i ? 'font-mono text-xs' : ''}>{c}</td>)}</tr>)}</tbody></table></div>
        <p className="mt-2 font-mono text-[11px] text-char/60">Table 5 (report). Deviation from the best across all 68 instances.</p>
        <div className="scroll-x mt-4"><Tex t={String.raw`\text{Gap}(\%)=\frac{z_{\text{ALNS}}-z_{\text{BKS}}}{z_{\text{BKS}}}\times 100`} /></div>
      </div>
    </div>
    <div className="mt-12 grid gap-8 md:grid-cols-2 text-[15px] leading-relaxed text-char/80">
      <div><h3 className="mb-2 text-2xl text-maroon">What the numbers indicate</h3>
        <p>Taking the best of ten seeds, the median instance lands about 1% above the best-known solution. Even the worst seed per instance has a median gap of about 2%. For each instance the minimum, mean and maximum gap across the ten seeds were recorded, so the spread also reflects consistency across random initialisations.</p>
        <p className="mt-3">The report notes that the foundational paper reported median gaps of 1.7%, 2.9% and 4.0% on a different benchmark set and budget, so that comparison is <b>indicative only</b>.</p></div>
      <div><h3 className="mb-2 text-2xl text-maroon">Caveats stated in the report</h3>
        <ul className="list-disc space-y-1.5 pl-5"><li>Validation used j = 200, k = 10. The dataset used a lighter budget (j = 100, k = 5), so Table 5 is an upper bound on label quality.</li>
          <li>Tour lengths use unrounded Euclidean distances, while CVRPLIB BKS values use rounded integer distances. The difference is negligible.</li>
          <li>Seeds: <span className="break-all font-mono text-xs">{seeds.join(', ')}</span> (Mersenne Twister).</li></ul></div>
    </div>
    <figure className="mt-12"><img src={convImg} alt="Illustrative convergence plots on four benchmark instances" className="mx-auto w-full max-w-2xl border border-char/15 bg-white" loading="lazy" />
      <figcaption className="mt-2 text-center font-mono text-[11px] text-char/60">Fig. 3 (report). Illustrative convergence plots (X-n101-k25, X-n204-k19, X-n327-k20, X-n491-k59).</figcaption></figure>
  </Section>)

const flow = ['Synthetic Instances', 'ALNS Optimisation', 'Tour-Length Extraction', 'Validated Dataset']
export const Final = () => (
  <Section id="final" kicker="09 · The final dataset" title="From Optimisation to Research-Ready Data">
    <Reveal><div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">{flow.map((f, i) => <div key={f} className="flex flex-1 items-center gap-3">
      <div className={`flex-1 p-4 text-center font-serif text-lg sm:p-5 sm:text-xl ${i === 3 ? 'bg-maroon text-cream' : 'bg-pale text-maroon'}`}>{f}{i === 0 && <div className="font-mono text-xs text-char/60">1,080</div>}</div>{i < 3 && <ArrowRight className="hidden shrink-0 text-gold lg:block" />}</div>)}</div></Reveal>
    <div className="mt-10 grid gap-8 md:grid-cols-2">
      <p className="lead">Every one of the <b>1,080 instances</b> has now been solved with the updated ALNS implementation. Each instance carries its spatial and demand pattern, its macro parameters and its optimised tour length.</p>
      <div className="card"><p className="kicker mb-2">Fields per instance, as described in the report</p><ul className="list-disc space-y-1 pl-5 text-sm text-char/80">
        <li>Spatial distribution family and demand distribution family</li><li>Service region size l<sub>x</sub> × l<sub>y</sub>, customer count n, vehicle capacity q<sub>v</sub>, depot position (ρ<sub>x</sub>, ρ<sub>y</sub>)</li><li>Seed (30 per configuration)</li><li>Near-optimal ALNS tour length</li></ul></div>
    </div>
    <p className="mt-6 max-w-3xl text-sm text-char/70">This dataset is the foundation for the next stage. It is ground truth for fitting, not evidence that any final formula is accurate. The ALNS labels themselves carry roughly a 1–2% deviation from best-known solutions, which sets a practical floor on achievable accuracy.</p>
  </Section>)
