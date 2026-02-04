import { HeroSection } from '@/components/hero-section'
import { ScrollytellingSection } from '@/components/scrollytelling-section'
import { Footer } from '@/components/footer'
import { LavaBackground } from '@/components/lava-background'

export default function Page() {
  return (
    <>
      <LavaBackground />
      <main className="min-h-screen relative">
        <HeroSection />
        <ScrollytellingSection />
        <Footer />
      </main>
    </>
  )
}
