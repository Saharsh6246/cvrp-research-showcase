export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { maroon: '#79251F', burgundy: '#65201B', cream: '#FAF6ED', pale: '#F2E8D1', gold: '#CDA447', char: '#332B29' },
    fontFamily: { serif: ['"DM Serif Display"', 'Georgia', 'serif'], sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'] }
  } },
  plugins: []
}
