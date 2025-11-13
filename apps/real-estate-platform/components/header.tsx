"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Cross2Icon } from "@radix-ui/react-icons"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-serif font-bold text-foreground">Bay Area Realty</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? <Cross2Icon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/#properties"
            className="text-sm font-medium leading-6 text-foreground hover:text-accent transition-colors"
          >
            Properties
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium leading-6 text-foreground hover:text-accent transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium leading-6 text-foreground hover:text-accent transition-colors"
          >
            Contact
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* Auth links moved to footer for cleaner client-facing design */}
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border">
          <div className="space-y-2 px-6 pb-6 pt-6">
            <Link
              href="/#properties"
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              href="/about"
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {/* Auth links moved to footer for cleaner client-facing design */}
          </div>
        </div>
      )}
    </header>
  )
}
