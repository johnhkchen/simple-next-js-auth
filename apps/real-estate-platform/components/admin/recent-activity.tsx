import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const activities = [
  { id: 1, user: "Sarah Chen", action: "scheduled a viewing", property: "Modern Loft in SOMA", time: "2 hours ago" },
  { id: 2, user: "Michael Brown", action: "submitted an offer", property: "Victorian Charmer", time: "4 hours ago" },
  { id: 3, user: "Emily Davis", action: "requested info", property: "Palo Alto Estate", time: "6 hours ago" },
  { id: 4, user: "James Wilson", action: "viewed listing", property: "Sausalito Condo", time: "8 hours ago" },
  { id: 5, user: "Lisa Anderson", action: "scheduled a viewing", property: "Berkeley Retreat", time: "1 day ago" },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Recent Activity</CardTitle>
        <Link href="/admin/inquiries">
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <Avatar>
                <AvatarFallback>
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium text-foreground">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                </p>
                <p className="text-sm text-muted-foreground">{activity.property}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
