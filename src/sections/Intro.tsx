import { Section, Reveal, Eq, Tex, Tag } from '../components/ui'
import CvrpDemo from '../components/CvrpDemo'
import { Boxes, Database, ShieldCheck, Sigma } from 'lucide-react'

export const Problem = () => (
  <Section id="problem" kicker="01 · The research problem" title="Understanding the Problem">
    <div className="grid gap-10 md:grid-cols-2">
      <Reveal><div className="space-y-4 lead">
        <p>In the <b>Capacitated Vehicle Routing Problem (CVRP)</b>, a depot serves many customers, each with a demand. Vehicles have limited carrying capacity, and every route starts and ends at the depot. The goal is to minimise total delivery distance while respecting capacity.</p>
        <p>Because the VRP is NP-hard, strong solutions need computationally heavy metaheuristics for realistic sizes. That is justified for <b>operational planning</b>, where dispatchers hold exact order lists. For <b>strategic planning</b> (warehouse siting, fleet sizing, territory design) planners work with representative scenarios and only need the expected total tour length.</p>
        <p><b>Continuous approximation (CA)</b> replaces discrete customer coordinates with continuous density functions, so tour length can be estimated analytically instead of re-solving the whole routing problem for every candidate network.</p>
      </div></Reveal>
      <Reveal delay={0.1}><div className="card"><p className="kicker mb-2">Why it matters</p>
        <p className="text-sm leading-relaxed text-char/80">Last-mile delivery accounts for over 40% of overall supply-chain costs (Capgemini, 2019). Running a routing solver for thousands of candidate configurations is impractical at the strategic stage, which is the gap a fast, interpretable estimator fills.</p></div></Reveal>
    </div>
    <div className="mt-10"><Reveal><CvrpDemo /></Reveal></div>
  </Section>
)

export const Background = () => (
  <Section id="background" kicker="02 · Background and original research" title="Building on Existing Research" alt>
    <div className="grid min-w-0 gap-10 lg:grid-cols-2">
      <div className="min-w-0">
        <Reveal><p className="lead">The classic CA formulation of Daganzo (1984) splits a tour into a <b>long-haul</b> component (depot to service region) and a <b>last-mile</b> component that scales with the number of customers per tour and inversely with the square root of customer density.</p></Reveal>
        <Eq tex={String.raw`l = 2\rho + k\,\frac{c}{\sqrt{\delta}}`} caption="Daganzo (1984), as cited in the report"
          vars={[['l', 'total delivery tour length'], ['\\rho', 'average distance between depot and customers'], ['k', 'last-mile (detour) coefficient'], ['c', 'number of customers in the tour'], ['\\delta', 'customer density, n/a']]} />
        <Reveal><p className="lead">When customers follow a non-uniform density <Tex t="f_{XY}(x,y)" />, demand follows an arbitrary law and the depot sits at <Tex t="(\rho_x,\rho_y)" />, the general form is an integral with no closed-form solution for complex layouts.</p></Reveal>
        <Eq tex={String.raw`l = 2\left[\int_X |x-\rho_x|\,f_X(x)\,dx + \int_Y |y-\rho_y|\,f_Y(y)\,dy\right] + \beta\left[\iint_{XY}\sqrt{f_{XY}(x,y)}\,dx\,dy\right]\frac{c}{\sqrt{\delta}}`} caption="General integral form (Beardwood et al., 1959; Pahwa and Jaller, 2022)"
          vars={[['f_X, f_Y', 'marginal spatial densities'], ['f_{XY}', 'joint customer density'], ['\\beta', 'constant of the last-mile term'], ['(\\rho_x,\\rho_y)', 'depot coordinates']]} />
      </div>
      <div className="min-w-0">
        <Reveal><p className="lead">The foundational paper (Kirubakaran, Pahwa, Kancharla and Waller, 2026) tackles this with <b>form-agnostic symbolic regression</b>: it synthesises 1,080 distribution environments, optimises each with ALNS, and fits closed-form expressions of the form below, where <Tex t="h(\mathbf{X})" /> is the long-haul term and <Tex t="k(\mathbf{X})" /> the last-mile parameter.</p></Reveal>
        <Eq tex={String.raw`l = 2h(\mathbf{X}) + k(\mathbf{X})\,\frac{n}{\sqrt{\delta}}`} caption="Paper, Eq. 13" />
        <Reveal><p className="lead">Its recommended models for strategic use are interpretable, closed-form expressions. When complete spatial and demand information is available:</p></Reveal>
        <Eq tex={String.raw`l = 2\rho_w\,\frac{n\mu_d}{q_v} + \left(\frac{\mu_s/\sqrt{a}}{\mu_s/\sqrt{a}+0.022}\right)\frac{n}{\sqrt{\delta}}`} caption="Paper, Eq. 35"
          vars={[['\\rho_w', 'demand-weighted mean depot–customer distance'], ['\\mu_d', 'first moment of customer demand'], ['q_v', 'vehicle capacity'], ['\\mu_s', 'first moment of nearest-neighbour distance'], ['a', 'effective size of the service region']]} />
        <p className="text-sm text-char/70">Interpretable analytical models matter because they can be dropped into location-routing and fleet-sizing models that need closed-form expressions, which black-box estimators cannot.</p>
      </div>
    </div>
    <Reveal><div className="mt-14 grid gap-px overflow-hidden border border-char/15 bg-char/15 md:grid-cols-2">
      <div className="bg-cream p-7"><p className="kicker mb-3">Existing framework</p><ul className="list-disc space-y-2 pl-5 text-sm text-char/80">
        <li>Original continuous approximation formulation</li>
        <li>Classical CA assumes uniformly scattered customers with identical demands and a distant depot</li>
        <li>The foundational paper extends this with 1,080 environments and symbolic regression (Uniform, Triangular, Normal, Exponential, Constant, Boundary)</li></ul></div>
      <div className="bg-maroon p-7 text-cream"><p className="kicker mb-3">Research extension</p><ul className="list-disc space-y-2 pl-5 text-sm text-cream/85">
        <li>Expanded spatial distributions: Multi-Cluster and Beta (U-shaped)</li>
        <li>Expanded customer demand patterns, with the same two additions</li>
        <li>More diverse synthetic environments, with seed-controlled comparisons</li>
        <li>Benchmark-validated optimisation-generated tour lengths</li>
        <li>Symbolic-regression formulation improvement <Tag future /></li></ul></div>
    </div></Reveal>
    <Reveal><p className="mt-6 max-w-3xl text-sm text-char/70"><b>Motivating question from the report:</b> whether moment-based descriptors of nearest-neighbour distance and demand remain adequate when environments include multi-modal spatial and demand patterns is not yet established, nor how much model complexity is justified before generalisation to independent benchmarks deteriorates.</p></Reveal>
  </Section>
)

const cards = [
  { i: Boxes, t: 'Distribution Expansion', d: 'Introduce additional spatial and demand distributions (Multi-Cluster and Beta U-shaped) to represent more diverse delivery environments.', f: false },
  { i: Database, t: 'Synthetic Dataset Development', d: 'Generate a comprehensive dataset covering all combinations of spatial and demand patterns: 36 configurations, 1,080 instances.', f: false },
  { i: ShieldCheck, t: 'Optimisation and Validation', d: 'Obtain reliable tour lengths with an updated ALNS solver and validate it against 68 CVRPLIB X-series benchmark instances.', f: false },
  { i: Sigma, t: 'Symbolic Regression', d: 'Use the prepared dataset to derive an improved, interpretable closed-form tour-length formula in the next stage.', f: true },
]
export const Objectives = () => (
  <Section id="objectives" kicker="03 · Research objectives" title="What Are We Trying to Achieve?">
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, k) => <Reveal key={c.t} delay={k * 0.08}><div className={`card h-full ${c.f ? 'border-dashed border-gold' : ''}`}>
        <c.i className="mb-4 text-maroon" size={26} strokeWidth={1.4} /><div className="mb-3"><Tag future={c.f} /></div>
        <h3 className="mb-2 text-xl text-maroon sm:text-2xl">{c.t}</h3><p className="text-sm leading-relaxed text-char/75">{c.d}</p></div></Reveal>)}
    </div>
  </Section>
)
