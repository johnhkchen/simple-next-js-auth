import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, BedDouble, Bath, Ruler, Calendar, Heart, Share2 } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params

  // Fetch property from database
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !property) {
    notFound()
  }

  // Parse features and amenities from JSONB
  const features = property.features || []
  const amenities = property.amenities || []
  const allFeatures = [...features, ...amenities]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          {/* Hero Section with Main Image */}
          <div className="mb-8">
            <img
              src={property.main_image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'}
              alt={property.title}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Address */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{property.title}</h1>
                  <Badge variant={property.status === "published" ? "default" : "secondary"}>
                    {property.status}
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {property.location || `${property.address_city}, ${property.address_state}`}
                </p>
              </div>

              {/* Price & Key Details */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Price</p>
                      <p className="text-4xl font-bold">
                        ${property.price?.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <BedDouble className="h-5 w-5" />
                          <span className="text-sm">Beds</span>
                        </div>
                        <p className="text-2xl font-bold">{property.bedrooms || 0}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Bath className="h-5 w-5" />
                          <span className="text-sm">Baths</span>
                        </div>
                        <p className="text-2xl font-bold">{property.bathrooms || 0}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Ruler className="h-5 w-5" />
                          <span className="text-sm">Sq Ft</span>
                        </div>
                        <p className="text-2xl font-bold">{property.sqft?.toLocaleString() || 0}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              {property.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>About This Property</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Features */}
              {allFeatures.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Features & Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {allFeatures.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Interested?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" size="lg">
                    Schedule a Viewing
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Agent
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="ghost" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="font-medium capitalize">{property.property_type || 'Residential'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Listing Type</span>
                    <span className="font-medium capitalize">{property.listing_type || 'Sale'}</span>
                  </div>
                  {property.year_built && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year Built</span>
                      <span className="font-medium">{property.year_built}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bedrooms</span>
                    <span className="font-medium">{property.bedrooms || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bathrooms</span>
                    <span className="font-medium">{property.bathrooms || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Square Feet</span>
                    <span className="font-medium">{property.sqft?.toLocaleString() || 0}</span>
                  </div>
                  {property.lot_size && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lot Size</span>
                      <span className="font-medium">{property.lot_size.toLocaleString()} sq ft</span>
                    </div>
                  )}
                  {property.parking_spaces && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Parking</span>
                      <span className="font-medium">{property.parking_spaces} spaces</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Address */}
              {property.address_street && (
                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {property.address_street}<br />
                      {property.address_city}, {property.address_state} {property.address_zip}
                    </p>
                    {property.neighborhood && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Neighborhood: {property.neighborhood}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Agent Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Listed By</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1">Bay Area Realty</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    (415) 555-0100
                  </p>
                  <Button variant="outline" className="w-full">
                    View All Listings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
