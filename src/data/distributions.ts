// All formulations are transcribed from Tables 1 and 2 of the UGRP report.
export type Dist = { id: string; name: string; abbr: string; latex: string; what: string; note?: string; isNew?: boolean }

export const spatial: Dist[] = [
  { id: 'U', name: 'Uniform', abbr: 'U_s', latex: String.raw`\left\{ U\!\left(-0.5l_k,\,0.5l_k\right);\ i\in[1,n],\ k\in\{x,y\}\right\}`,
    what: 'Customers are equally likely to appear anywhere in the service region. This is the classical continuous-approximation layout.' },
  { id: 'T', name: 'Triangular', abbr: 'T_s', latex: String.raw`\left\{ T\!\left(-0.5l_k,\,0.5l_k,\,U(-0.5l_k,0.5l_k)\right);\ i\in[1,n],\ k\in\{x,y\}\right\}`,
    what: 'Each coordinate follows a triangular law over the region limits, with the mode drawn uniformly. Customers agglomerate around a random point.' },
  { id: 'NT', name: 'Normal (Truncated)', abbr: 'NT_s', latex: String.raw`\left\{ NT\!\left(U(-0.5l_k,0.5l_k),\,U(0.1l_k,0.4l_k),\,-0.5l_k,\,0.5l_k\right);\ i\in[1,n],\ k\in\{x,y\}\right\}`,
    what: 'A single bell-shaped concentration with random centre and spread, truncated at the service-region boundary.' },
  { id: 'ET', name: 'Exponential (Truncated)', abbr: 'ET_s', latex: String.raw`\left\{ ET\!\left(U(0,l_k),0,l_k\right)-0.5l_k\ \ \text{OR}\ \ 0.5l_k-ET\!\left(U(0,l_k),0,l_k\right);\ i\in[1,n],\ k\in\{x,y\}\right\}`,
    what: 'Density decays away from an edge of the region. The OR term mirrors the decay so it can start from either side.' },
  { id: 'MC', name: 'Multi-Cluster', abbr: 'MC_s', isNew: true,
    latex: String.raw`\left\{ NT\!\left(c_{j,k},\,U(0.07l_k,0.10l_k),\,-0.5l_k,\,0.5l_k\right);\ i\in[1,n],\ k\in\{x,y\}\right\};\ c_{j,k}\sim U(-0.4l_k,\,0.4l_k),\ j\in[1,DU\{3,\ldots,6\}]`,
    note: 'Centres are kept at least 0.25 apart (normalised units).',
    what: 'Between three and six compact clusters, each a truncated normal with a tight spread. It represents geographically concentrated customer groups such as towns, estates or business districts.' },
  { id: 'B', name: 'Beta (U-shaped)', abbr: 'B_s', isNew: true,
    latex: String.raw`\left\{ \left(B\!\left(U(0.3,0.5),\,U(0.3,0.5)\right)-0.5\right)l_k;\ i\in[1,n],\ k\in\{x,y\}\right\}`,
    what: 'Both Beta shape parameters are below one, so the density is U-shaped. Customers pile up towards the boundaries of the service region and thin out in the middle.' },
]

export const demand: Dist[] = [
  { id: 'U', name: 'Uniform', abbr: 'U_d', latex: String.raw`\left\{ U(0,2);\ i\in[1,n]\right\}`, what: 'Demand is equally likely anywhere on [0, 2] load units.' },
  { id: 'T', name: 'Triangular', abbr: 'T_d', latex: String.raw`\left\{ T\!\left(0,2,U(0,2)\right);\ i\in[1,n]\right\}`, what: 'Triangular demand on [0, 2] with a randomly drawn mode, so demand is skewed towards that value.' },
  { id: 'NT', name: 'Normal (Truncated)', abbr: 'NT_d', latex: String.raw`\left\{ NT\!\left(U(0,2),\,U(0.2,0.8),\,0,\,2\right);\ i\in[1,n]\right\}`, what: 'Bell-shaped demand around a random mean with random spread, truncated to [0, 2].' },
  { id: 'ET', name: 'Exponential (Truncated)', abbr: 'ET_d', latex: String.raw`\left\{ ET\!\left(U(0,2),0,2\right)\ \text{OR}\ 2-ET\!\left(U(0,2),0,2\right);\ i\in[1,n]\right\}`, what: 'Most customers sit near one end of the demand range, either small or large, with the direction chosen at random.' },
  { id: 'MC', name: 'Multi-Cluster', abbr: 'MC_d', isNew: true,
    latex: String.raw`\left\{ NT\!\left(\mu_j,\,U(0.1,0.2),\,0,\,2\right);\ i\in[1,n]\right\};\ \mu_j\sim U(0.3,\,1.7),\ j\in[1,DU\{2,3\}]`,
    note: 'Tier means are kept at least 0.5 apart.',
    what: 'Two or three demand tiers, each a narrow truncated normal. It represents mixed customer classes, for example small households alongside bulk buyers.' },
  { id: 'B', name: 'Beta (U-shaped)', abbr: 'B_d', isNew: true,
    latex: String.raw`\left\{ 2B(\alpha,\alpha);\ i\in[1,n]\right\};\ \alpha\sim U(0.3,\,0.8)`,
    what: 'A symmetric Beta with alpha below one, scaled to [0, 2]. Demand is concentrated near the extremes: many very small and many very large orders.' },
]
