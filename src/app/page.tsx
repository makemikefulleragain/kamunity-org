import Nav from '../components/Nav'
import Hero from '../components/Hero'
import SubHero from '../components/SubHero'
import ProblemSolution from '../components/ProblemSolution'
import HowItWorks from '../components/HowItWorks'
import Values from '../components/Values'
import Showcase from '../components/Showcase'
import Feed from '../components/Feed'
import About from '../components/About'
import CTA from '../components/CTA'
import MachineLayer from '../components/MachineLayer'
import Footer from '../components/Footer'

function Divider() {
  return <div className="w-10 h-0.5 bg-fire-amber mx-auto my-14 opacity-50 rounded-sm" />
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <div className="max-w-[960px] mx-auto px-8 pt-8">
        <SubHero />
        <Divider />
        <ProblemSolution />
        <Divider />
        <HowItWorks />
        <Divider />
        <Values />
        <Divider />
        <Showcase />
        <Divider />
        <Feed />
        <Divider />
        <About />
        <CTA />
        <MachineLayer />
      </div>
      <Footer />
    </>
  )
}
