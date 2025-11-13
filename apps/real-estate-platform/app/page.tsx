import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PropertyGrid } from "@/components/property-grid"
import { FeaturedProperty } from "@/components/featured-property"
import { Stats } from "@/components/stats"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        <FeaturedProperty />
        <PropertyGrid />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
