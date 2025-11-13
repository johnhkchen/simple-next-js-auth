"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactSection() {
  return (
    <section className="py-16 lg:py-24" id="contact">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-foreground lg:text-5xl text-balance">
              Let's Find Your Perfect Home
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Our experienced realtors are here to guide you through every step of your real estate journey. Schedule a
              consultation today and discover the possibilities.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Visit Our Office</h3>
                <p className="text-muted-foreground mt-1">
                  123 Market Street, Suite 500
                  <br />
                  San Francisco, CA 94103
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Contact Us</h3>
                <p className="text-muted-foreground mt-1">
                  Phone: (415) 555-0123
                  <br />
                  Email: info@bayarearealty.com
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <form className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" placeholder="(415) 555-0123" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us about your ideal property..." rows={4} />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
