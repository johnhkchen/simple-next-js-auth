"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Trash2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useList } from "@refinedev/core"

interface PropertyListProps {
  onViewProperty?: (propertyId: number) => void
  onEditProperty?: (propertyId: number) => void
}

export function PropertyList({ onViewProperty, onEditProperty }: PropertyListProps) {
  const { data, isLoading } = useList({
    resource: "properties",
    pagination: {
      pageSize: 5,
    },
    sorters: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
  })

  const properties = data?.data || []
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Property Listings</CardTitle>
        <Link href="/admin/properties">
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No properties found</div>
        ) : (
          <div className="space-y-4">
            {properties.map((property: any) => (
            <div
              key={property.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onViewProperty?.(property.id)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground">{property.title}</h3>
                  <Badge variant={property.status === "published" ? "default" : "secondary"}>
                    {property.status?.toUpperCase() || "DRAFT"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="font-medium">${property.price?.toLocaleString()}</span>
                  {property.location && (
                    <>
                      <span>•</span>
                      <span>{property.location}</span>
                    </>
                  )}
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
        )}
      </CardContent>
    </Card>
  )
}
