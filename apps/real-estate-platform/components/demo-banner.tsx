"use client"

import { useState, useEffect } from 'react'
import { X, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has previously dismissed the banner
    const isDismissed = localStorage.getItem('demo-banner-dismissed')
    if (!isDismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('demo-banner-dismissed', 'true')
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
          <p className="text-sm text-yellow-800 font-medium">
            <span className="font-bold">Demo Site:</span> This is a demonstration website.
            All properties, listings, and information presented are fictitious and for illustrative purposes only.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="text-yellow-800 hover:text-yellow-900 hover:bg-yellow-100 flex-shrink-0"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  )
}
