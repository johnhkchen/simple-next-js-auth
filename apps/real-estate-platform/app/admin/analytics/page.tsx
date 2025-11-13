"use client"

export const dynamic = 'force-dynamic'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Eye, Users, DollarSign } from "lucide-react"

const stats = [
  { label: "Total Views", value: "12,543", change: "+12.5%", icon: Eye, trend: "up" },
  { label: "Active Listings", value: "48", change: "+3", icon: TrendingUp, trend: "up" },
  { label: "Total Clients", value: "234", change: "+18", icon: Users, trend: "up" },
  { label: "Revenue (MTD)", value: "$142,500", change: "+8.2%", icon: DollarSign, trend: "up" },
]

const topProperties = [
  { title: "Luxury Bay View Condo", views: 1243, inquiries: 45, status: "Hot" },
  { title: "Modern Downtown Loft", views: 987, inquiries: 32, status: "Hot" },
  { title: "Family Home in Suburbs", views: 876, inquiries: 28, status: "Active" },
  { title: "Penthouse Suite", views: 654, inquiries: 19, status: "Active" },
]

export default function AnalyticsPage() {
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Analytics</h1>
        <p style={{ color: "#666" }}>Track your performance and insights</p>
      </div>

      <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card style={{ marginTop: "24px" }}>
        <CardHeader>
          <CardTitle>Top Performing Properties</CardTitle>
          <CardDescription>Your most viewed and inquired listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProperties.map((property) => (
              <div key={property.title} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <h3 className="font-medium">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {property.views} views · {property.inquiries} inquiries
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  property.status === "Hot"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                }`}>
                  {property.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", marginTop: "16px" }}>
        <Card>
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Chart visualization coming soon
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inquiries by Property Type</CardTitle>
            <CardDescription>Distribution breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Chart visualization coming soon
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
