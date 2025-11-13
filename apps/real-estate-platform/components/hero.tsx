import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1600&q=80" alt="San Francisco Bay Area" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
        <h1 className="text-5xl font-serif font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
          Discover Your Dream Home in the Bay Area
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Experience exceptional living with our curated collection of premium properties across San Francisco, Palo
          Alto, and beyond.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" asChild>
            <Link href="#properties">Explore Properties</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#contact">Schedule Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
