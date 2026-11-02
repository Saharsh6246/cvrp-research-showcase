import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Problem, Background, Objectives } from './sections/Intro'
import { Methodology, Distributions, Dataset } from './sections/Method'
import { Alns } from './sections/Alns'
import { Validation, Final } from './sections/Results'
import { Future, References, Contact } from './sections/Future'
export default function App() {
  return (<><Navbar /><main><Hero /><Problem /><Background /><Objectives /><Methodology /><Distributions /><Dataset /><Alns /><Validation /><Final /><Future /><References /></main><Contact /></>)
}
