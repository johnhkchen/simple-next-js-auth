export function Stats() {
  const stats = [
    { value: "500+", label: "Properties Sold" },
    { value: "$2.5B+", label: "Total Sales Volume" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Years Experience" },
  ]

  return (
    <section className="py-16 lg:py-24 border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-serif font-bold text-foreground lg:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
