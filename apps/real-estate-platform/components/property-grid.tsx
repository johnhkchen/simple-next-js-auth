import { PropertyCard } from "@/components/property-card"
import { createClient } from "@/lib/supabase/server"

export async function PropertyGrid() {
  const supabase = await createClient()

  // Fetch published properties from database
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching properties:', error)
    return <div>Error loading properties</div>
  }

  if (!properties || properties.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30" id="properties">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground lg:text-5xl">Available Properties</h2>
            <p className="mt-4 text-lg text-muted-foreground">Explore our handpicked selection of exceptional homes</p>
          </div>
          <div className="text-center text-muted-foreground">
            <p>No properties available at the moment. Check back soon!</p>
          </div>
        </div>
      </section>
    )
  }

  // Transform database properties to match component interface
  const transformedProperties = properties.map((prop) => ({
    id: prop.id,
    title: prop.title,
    location: prop.location || `${prop.address_city}, ${prop.address_state}`,
    price: prop.price,
    beds: prop.bedrooms || 0,
    baths: prop.bathrooms || 0,
    sqft: prop.sqft || 0,
    image: prop.main_image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    status: prop.listing_type === 'sale' ? 'For Sale' : prop.listing_type === 'rent' ? 'For Rent' : 'For Lease',
  }))

  return (
    <section className="py-16 lg:py-24 bg-muted/30" id="properties">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground lg:text-5xl">Available Properties</h2>
          <p className="mt-4 text-lg text-muted-foreground">Explore our handpicked selection of exceptional homes</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {transformedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
