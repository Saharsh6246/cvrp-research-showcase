import { Section, Reveal, Eq, Tag } from '../components/ui'
import { refs } from '../data/references'
import { Mail, Globe, Github, Linkedin, Download } from 'lucide-react'

const steps = ['Use the prepared dataset of 1,080 instances', 'Compute descriptors a planner could obtain at the strategic stage (n, a, δ, nearest-neighbour distances, ρu, ρw, moments of distance and demand)', 'Explore relationships between the inputs and optimised tour lengths', 'Apply symbolic regression to identify candidate closed-form expressions', 'Evaluate prediction accuracy using Absolute Percentage Error (APE)', 'Assess interpretability and generalisation across distribution environments, with seed-grouped validation splits', 'Compare against the Daganzo (1984) baseline on independent CVRPLIB benchmark instances']
const plan = [['Data preparation and feature construction', '1–3'], ['Model-form specification', '3–5'], ['Symbolic regression training', '5–9'], ['Training-set diagnostics', '9–11'], ['Benchmark testing', '11–14'], ['Interpretation and reporting', '14–16']]
export const Future = () => (
  <Section id="next" kicker="10 · What comes next" title="The Next Stage: Symbolic Regression" dark>
    <Reveal><div className="mb-8"><Tag future /></div><p className="lead max-w-3xl">Next semester will use symbolic regression to turn the dataset into interpretable closed-form CA equations. <b>This is planned work. No formula has been derived yet.</b></p></Reveal>
    <div className="my-8 grid items-stretch gap-3 sm:my-12 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
      {[['Input variables + optimised tour-length data', 'bg-burgundy'], ['Symbolic regression', 'bg-gold text-char'], ['Candidate mathematical expression', 'border border-dashed border-gold bg-transparent']].map(([t, c], i) => (<>
        <div key={t} className={`flex items-center justify-center p-4 text-center font-serif text-lg sm:p-6 sm:text-xl ${c}`}>{t}</div>{i < 2 && <div key={'a' + i} className="hidden items-center text-3xl text-gold lg:flex">→</div>}</>))}
    </div>
    <div className="grid gap-10 lg:grid-cols-2">
      <ol className="space-y-3">{steps.map((s, i) => <li key={s} className="flex gap-4 border-b border-gold/25 pb-3 text-sm text-cream/85"><span className="font-mono text-gold">{i + 1}</span>{s}</li>)}</ol>
      <div>
        <p className="kicker mb-3">Planned model structure (report, Work Plan)</p>
        <div className="bg-cream p-3 text-char"><Eq tex={String.raw`l = 2h(X) + k(X)\,\frac{n}{\sqrt{\delta}}`} vars={[['h(X)', 'long-haul term, fixed in a small number of forms'], ['k(X)', 'last-mile coefficient, searched by symbolic regression']]} /></div>
        <p className="mb-2 mt-6 kicker">Proposed 16-week schedule</p>
        <div className="scroll-x"><table className="t t-fit text-cream/90"><tbody>{plan.map(([a, w]) => <tr key={a}><td className="!border-gold/25">{a}</td><td className="whitespace-nowrap !border-gold/25 pl-4 text-right font-mono text-xs text-gold">Weeks {w}</td></tr>)}</tbody></table></div>
      </div></div>
  </Section>)

export const References = () => (
  <Section id="refs" kicker="11 · References and acknowledgements" title="References and Acknowledgements">
    <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-8">{refs.map(g => <div key={g.cat}><p className="kicker mb-3">{g.cat}</p><ul className="space-y-2.5 text-[13.5px] leading-relaxed text-char/80">{g.items.map(r => <li key={r} className="border-l border-gold pl-3">{r}</li>)}</ul></div>)}</div>
      <div className="card h-fit"><p className="kicker mb-3">Acknowledgements</p><ul className="space-y-3 text-sm text-char/80">
        <li><b>Dr. Anmol Pahwa</b>, research supervisor, Department of Civil Engineering, IIT Madras</li>
        <li><b>LogNiti Lab</b>, IIT Madras: a techno-policy logistics lab for sustainable and resilient logistics</li>
        <li><b>Indian Institute of Technology Madras</b></li></ul></div>
    </div>
  </Section>)

// Add your own links here. GitHub and LinkedIn were not supplied in the uploaded materials.
const CONTACT = { email: 'ce24b027@smail.iitm.ac.in', web: 'https://portfolio-website-5pvzkf9ej-saharsh6246s-projects.vercel.app/', github: '', linkedin: '' }
export const Contact = () => (
  <section className="dark bg-burgundy py-16 text-cream sm:py-24"><div className="wrap min-w-0">
    <p className="kicker mb-3">Contact</p><h2 className="h2 max-w-3xl">Thank You for Exploring This Research</h2>
    <dl className="mt-8 grid gap-x-10 gap-y-3 font-mono text-sm sm:mt-10 sm:grid-cols-[auto_1fr]">
      <dt className="text-gold">Researcher</dt><dd>Saharsh Yadav</dd><dt className="text-gold">Institution</dt><dd>IIT Madras</dd>
      <dt className="text-gold">Department</dt><dd>Civil Engineering</dd><dt className="text-gold">Research Group</dt><dd>LogNiti Lab</dd></dl>
    <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
      <a className="btn btn-gold w-full break-all sm:w-auto" href={`mailto:${CONTACT.email}`}><Mail size={16} className="shrink-0" />{CONTACT.email}</a>
      <a className="btn btn-line w-full sm:w-auto" href={CONTACT.web} target="_blank" rel="noreferrer"><Globe size={16} />Portfolio</a>
      {CONTACT.github && <a className="btn btn-line" href={CONTACT.github}><Github size={16} />GitHub</a>}
      {CONTACT.linkedin && <a className="btn btn-line" href={CONTACT.linkedin}><Linkedin size={16} />LinkedIn</a>}
      <a className="btn btn-line w-full sm:w-auto" href="./UGRP_Final_Report.docx" download><Download size={16} />Research report</a>
      <a className="btn btn-line w-full sm:w-auto" href="./Kirubakaran_2026_Holistic_CA_Framework.pdf" download><Download size={16} />Original paper</a></div>
    <p className="mt-12 font-mono text-xs text-cream/50">LogNiti Lab · IIT Madras · Undergraduate Research Project</p>
  </div></section>)
