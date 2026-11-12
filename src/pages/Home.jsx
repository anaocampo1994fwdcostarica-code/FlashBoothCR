import Navbar from '../components/ui/Navbar'
import { useState } from 'react'
import Footer from '../components/ui/Footer'
import WhatsAppFloat from '../components/ui/WhatsAppFloat'

import Hero from '../components/sections/Hero'
import StatsBar from '../components/sections/StatsBar'
import Marquee from '../components/sections/Marquee'
import Services from '../components/sections/Services'
import VideosExperiences from '../components/sections/VideosExperiences'
import Gallery from '../components/sections/Gallery'
import RealEvents from '../components/sections/RealEvents'
import Pricing from '../components/sections/Pricing'
import Calculator from '../components/sections/Calculator'
import ContactForm from '../components/sections/ContactForm'
import FAQ from '../components/sections/FAQ'
import { useScrollReveal } from '../hooks/useMotion'
import { DEFAULT_PACKAGE_ID } from '../data/packages'
import MobileBottomBar from '../components/ui/MobileBottomBar'

export default function Home() {
  useScrollReveal()
  const [selectedPackageId, setSelectedPackageId] = useState(DEFAULT_PACKAGE_ID)
  const scrollToCalculator = () => requestAnimationFrame(() => document.getElementById('cotizador')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }))
  const customizePackage = (packageId) => {
    setSelectedPackageId(packageId)
    scrollToCalculator()
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Marquee />
        <Services />
        <VideosExperiences />
        <Gallery />
        <RealEvents />
        <Pricing onCustomize={customizePackage} />
        <Calculator selectedPackageId={selectedPackageId} />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileBottomBar />
    </>
  )
}
