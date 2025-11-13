"use client"

export const dynamic = 'force-dynamic'

import { useRouter } from 'next/navigation'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { PropertyList } from '@/components/admin/property-list'
import { RecentActivity } from '@/components/admin/recent-activity'

export default function AdminDashboardPage() {
  const router = useRouter()

  const handleViewProperty = (propertyId: number) => {
    router.push(`/admin/properties/show/${propertyId}`)
  }

  const handleEditProperty = (propertyId: number) => {
    router.push(`/admin/properties/edit/${propertyId}`)
  }

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Dashboard</h1>
        <p style={{ color: "#666" }}>
          Welcome back! Here's what's happening with your properties.
        </p>
      </div>
      <DashboardStats />
      <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", marginTop: "24px" }}>
        <PropertyList onViewProperty={handleViewProperty} onEditProperty={handleEditProperty} />
        <RecentActivity />
      </div>
    </div>
  )
}
