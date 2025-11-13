import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Award, TrendingUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
              About Bay Area Realty
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner in finding exceptional properties across the San Francisco Bay Area since 2008.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-4 mb-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Years in Business</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">17+</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Properties Sold</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,500+</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Happy Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,000+</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Industry Awards</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25+</div>
              </CardContent>
            </Card>
          </div>

          {/* Our Story */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2008, Bay Area Realty has been at the forefront of the San Francisco real estate market for over 17 years.
                What started as a small boutique agency has grown into one of the Bay Area's most trusted real estate firms,
                specializing in residential and commercial properties throughout San Francisco, Oakland, and the surrounding communities.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our team of experienced agents brings deep local knowledge, cutting-edge technology, and personalized service to every transaction.
                We believe in building lasting relationships with our clients, understanding that buying or selling a home is one of life's
                most significant decisions.
              </p>
            </CardContent>
          </Card>

          {/* Mission & Values */}
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide exceptional real estate services that exceed our clients' expectations through integrity,
                  expertise, and innovative technology.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the most trusted and respected real estate firm in the Bay Area, known for our commitment
                  to client success and community impact.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Integrity & Transparency</li>
                  <li>• Client-First Approach</li>
                  <li>• Local Expertise</li>
                  <li>• Innovation & Technology</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
