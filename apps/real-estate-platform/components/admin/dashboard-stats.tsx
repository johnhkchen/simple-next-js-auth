import { Card, CardContent } from "@/components/ui/card"
import { Building2, TrendingUp, Users, DollarSign } from "lucide-react"

const stats = [
  {
    name: "Total Listings",
    value: "24",
    change: "+3 this week",
    icon: Building2,
  },
  {
    name: "Active Viewings",
    value: "12",
    change: "8 scheduled",
    icon: Users,
  },
  {
    name: "Total Sales Value",
    value: "$45.2M",
    change: "+12% from last month",
    icon: DollarSign,
  },
  {
    name: "Avg. Sale Time",
    value: "28 days",
    change: "-5 days improvement",
    icon: TrendingUp,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-serif font-bold text-foreground mt-2">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
