import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Maximize } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export async function FeaturedProperty() {
  const supabase = await createClient()

  // Try to get a featured property, or just the most expensive one
  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'published')
    .order('price', { ascending: false })
    .limit(1)
    .single()

  if (!property) {
    return null // Don't show section if no properties
  }

  return (
    <section className="py-16 lg:py-24" id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2">
            <Badge className="mb-4">Featured Property</Badge>
            <h2 className="text-4xl font-serif font-bold text-foreground lg:text-5xl text-balance">
              {property.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {property.description || 'A stunning property offering exceptional living spaces and modern amenities.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bed className="h-5 w-5" />
                <span className="font-medium">{property.bedrooms || 0} Beds</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bath className="h-5 w-5" />
                <span className="font-medium">{property.bathrooms || 0} Baths</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Maximize className="h-5 w-5" />
                <span className="font-medium">{property.sqft?.toLocaleString() || 0} sq ft</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-3xl font-serif font-bold text-foreground">
                ${property.price?.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {property.location || `${property.address_city}, ${property.address_state}`}
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <Button size="lg" asChild>
                <Link href="#contact">Schedule Viewing</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/properties/${property.id}`}>View Details</Link>
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={property.main_image_url || "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80"}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
