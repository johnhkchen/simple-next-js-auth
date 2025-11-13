import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Trash2 } from "lucide-react"

const properties = [
  { id: 1, title: "Modern Loft in SOMA", status: "Active", price: "$1,850,000", views: 234 },
  { id: 2, title: "Victorian Charmer in Noe Valley", status: "Active", price: "$2,950,000", views: 189 },
  { id: 3, title: "Contemporary Estate in Palo Alto", status: "Pending", price: "$6,750,000", views: 312 },
  { id: 4, title: "Waterfront Condo in Sausalito", status: "Active", price: "$1,450,000", views: 156 },
  { id: 5, title: "Hillside Retreat in Berkeley", status: "Active", price: "$2,250,000", views: 203 },
]

interface PropertyListProps {
  onViewProperty?: (propertyId: number) => void
  onEditProperty?: (propertyId: number) => void
}

export function PropertyList({ onViewProperty, onEditProperty }: PropertyListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onViewProperty?.(property.id)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground">{property.title}</h3>
                  <Badge variant={property.status === "Active" ? "default" : "secondary"}>{property.status}</Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="font-medium">{property.price}</span>
                  <span>•</span>
                  <span>{property.views} views</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewProperty?.(property.id)
                  }}
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEditProperty?.(property.id)
                  }}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
