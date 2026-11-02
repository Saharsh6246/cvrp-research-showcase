# CVRP Tour Length Estimation: Interactive Research Showcase

React + TypeScript + Vite + Tailwind + Framer Motion + KaTeX + Lucide.

    npm install
    npm run dev      # local preview
    npm run build    # static site in dist/ (deploy to Vercel, Netlify, GitHub Pages)

## Where to edit
- `src/data/distributions.ts`: all spatial/demand formulas (LaTeX, transcribed from Tables 1 and 2 of your report)
- `src/data/dataset.ts`: counts, seeds, Table 3/5 values, ALNS steps, pipeline text
- `src/data/references.ts`: references
- `src/sections/Future.tsx`: set `CONTACT.github` and `CONTACT.linkedin` (not in your materials, so hidden until filled)
- `public/`: downloadable report (.docx) and the original paper (.pdf)

## Things to check (flagged, not silently resolved)
1. **Distribution sets differ.** The Elsevier paper uses Constant and Boundary families. Your report replaces them with Multi-Cluster and Beta (U-shaped). The site follows your report and labels these as new.
2. **Benchmark counts differ.** The paper validated on 50 instances from several libraries. Your report uses 68 CVRPLIB X-series instances. The site uses 68 and mentions the paper's gaps only as "indicative", as your report does.
3. **Paper already contains symbolic regression.** The paper fits CA models on its own 1,080 environments. The site presents symbolic regression on *your* dataset as planned work and never shows a derived formula.
4. **Paper internal inconsistency.** Baseline mean APE is quoted as 9.2% (Table 12), 8.0% (Table 16) and 8.2% (text). The site avoids those baseline numbers.
5. **Report vs paper ALNS settings differ** (e.g. 9 removal + 10 insertion operators and j = 100 in the report, 5 insertion and j = 50 in the paper). The site uses the report only.
6. **Figures 1 and 2 are the report's composite images**, shown whole, with the selected distribution highlighted through the tabs. Send individual panels if you want per-card crops.
7. Name shown as "Saharsh Yadav" (the report cover reads "Share Saharsh Yadav").
8. Phone number from your thank-you slide was left out on purpose. Email and portfolio link were taken from it.
