export const stats = [
  { label: 'Spatial Distributions', value: 6 },
  { label: 'Demand Distributions', value: 6 },
  { label: 'Environment Configurations', value: 36 },
  { label: 'Instances per Configuration', value: 30 },
  { label: 'Total CVRP Instances', value: 1080 },
]
export const seeds = [1010, 1106, 1509, 1604, 1905, 2104, 2412, 2703, 2710, 2807]

export const quartiles = [
  ['Min', '0.03 %', '0.15 %', '0.20 %'],
  ['1st Quartile', '0.63 %', '1.25 %', '1.60 %'],
  ['Median', '1.05 %', '1.57 %', '2.07 %'],
  ['3rd Quartile', '1.48 %', '2.04 %', '2.60 %'],
  ['Max', '4.25 %', '6.08 %', '7.60 %'],
]

export const params = [
  ['Segments j', '100', '200'],
  ['Segments between resets k', '5', '10'],
  ['Iterations per segment', 'x = max(100, |N|)', 'x = max(100, |N|)'],
  ['Local-search iterations m', '100x', '100x'],
  ['Rewards σ1 / σ2 / σ3', '15 / 10 / 3', '15 / 10 / 3'],
  ['Reaction factor ρ', '0.1', '0.1'],
]
export const removal = ['random-node','random-arc','random-segment','related-node','related-arc','related-segment','worst-node','worst-arc','worst-segment']
export const insertion = ['best-precise','best-perturb','greedy-precise','greedy-perturb','regret2-precise','regret2-perturb','regret3-precise','regret3-perturb','regret5-precise','regret5-perturb']
export const localSearch = ['intra-move','intra-swap','intra-opt','inter-move','inter-swap','inter-opt']

export const pipeline = [
  { t: 'Define the CVRP environment', g: 'data', d: 'A rectangular service region l_x × l_y (each from 1 to 9) centred at the origin, n customers (100 to 500), a single depot at (ρx, ρy) on a 0.1 grid of fractions of the region size, and a homogeneous fleet with capacity q_v from 10 to 100 in steps of 10. The depot may sit inside or outside the region.' },
  { t: 'Generate customer spatial distributions', g: 'data', d: 'Customer coordinates are drawn from one of six spatial families: Uniform, Triangular, Normal (Truncated), Exponential (Truncated), Multi-Cluster and Beta (U-shaped).' },
  { t: 'Generate customer demand distributions', g: 'data', d: 'Customer demands are drawn on [0, 2] load units from one of six matching demand families.' },
  { t: 'Combine into environment configurations', g: 'data', d: '6 spatial × 6 demand patterns give 36 configurations. Checkpoint seeding keeps (lx, ly, ρx, ρy, q_v, n) identical across all 36 pairs of a given seed, so the effect of the distribution pattern alone can be isolated.' },
  { t: 'Generate synthetic CVRP instances', g: 'data', d: 'Each configuration is generated with 30 fixed random seeds: 36 × 30 = 1,080 instances.' },
  { t: 'Optimise with updated ALNS', g: 'opt', d: 'Every instance is solved with the updated ALNS implementation in Julia (CVRP.jl) to obtain near-optimal routes.' },
  { t: 'Extract optimised tour lengths', g: 'opt', d: 'The total tour length of each ALNS solution is recorded as the ground-truth label for that instance.' },
  { t: 'Prepare the dataset for symbolic regression', g: 'val', d: 'The solver was first validated on 68 CVRPLIB X-series instances (680 runs). The labelled dataset is then ready for the next stage.' },
]

export const alnsSteps = [
  { t: 'Initial feasible solution', d: 'An iterated k-means clustering procedure raises the number of clusters until capacity constraints are satisfied. This gives s₀; the current solution s and best solution s* both start from it.' },
  { t: 'Remove customers (ruin)', d: 'A removal operator is drawn by roulette wheel from nine options (random, related or worst, each at node, arc or segment level). The number removed is sampled between min(5, 0.05x) and min(30, 0.30x).' },
  { t: 'Reinsert customers (recreate)', d: 'One of ten insertion operators rebuilds the route plan: best, greedy, regret-2, regret-3 or regret-5, each in a precise or a perturb (randomised) variant.' },
  { t: 'Evaluate', d: 'The candidate s′ is scored by total Euclidean distance plus proportional penalties for capacity violations. A hash of the route sequence checks whether the solution is novel.' },
  { t: 'Acceptance (Simulated Annealing)', d: 'A new best replaces both s and s*. An improvement on s replaces s. A worse candidate is accepted with Boltzmann probability exp((f(s) − f(s′))/T). Temperature is cooled each iteration down to a floor.' },
  { t: 'Update operator scores and weights', d: 'Rewards σ1 = 15 (new best), σ2 = 10 (better), σ3 = 3 (accepted worse) are added to the operators used, when novel. At the end of each segment, w ← ρ·π/c + (1 − ρ)·w with ρ = 0.1. Six local-search operators then refine s.' },
  { t: 'Repeat until the budget ends', d: 'The search runs j segments of x iterations each; every k segments s is reset to s* if no new best has been found. After the last segment the best solution s* is returned.' },
]
