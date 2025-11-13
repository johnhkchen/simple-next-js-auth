import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Maximize } from "lucide-react"

interface PropertyCardProps {
  property: {
    id: number
    title: string
    location: string
    price: number
    beds: number
    baths: number
    sqft: number
    image: string
    status: string
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute top-4 left-4">{property.status}</Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{property.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{property.location}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.beds} bd</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.baths} ba</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        <div className="text-2xl font-serif font-bold text-foreground">{formattedPrice}</div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/properties/${property.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
