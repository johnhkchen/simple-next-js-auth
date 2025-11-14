"use client"

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageGalleryProps {
  images: string[]
  alt?: string
}

export function ImageGallery({ images, alt = 'Property image' }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  const handlePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  return (
    <>
      {/* Main gallery grid */}
      <div className="grid grid-cols-4 gap-2">
        {/* Main image - takes 2x2 space */}
        <div
          className="col-span-2 row-span-2 relative aspect-square cursor-pointer group"
          onClick={() => setSelectedIndex(0)}
        >
          <Image
            src={images[0]}
            alt={`${alt} - Main`}
            fill
            className="object-cover rounded-lg group-hover:opacity-90 transition-opacity"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-lg" />
        </div>

        {/* Thumbnail images */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index + 1}
            className="relative aspect-square cursor-pointer group"
            onClick={() => setSelectedIndex(index + 1)}
          >
            <Image
              src={image}
              alt={`${alt} - ${index + 2}`}
              fill
              className="object-cover rounded-lg group-hover:opacity-90 transition-opacity"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-lg" />
          </div>
        ))}

        {/* Show remaining images count if more than 5 */}
        {images.length > 5 && (
          <div
            className="relative aspect-square cursor-pointer group"
            onClick={() => setSelectedIndex(5)}
          >
            <Image
              src={images[5]}
              alt={`${alt} - More`}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg hover:bg-opacity-70 transition-all">
              <span className="text-white text-lg font-semibold">
                +{images.length - 5} more
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation arrows */}
          {selectedIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="h-12 w-12" />
            </button>
          )}

          {selectedIndex < images.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="h-12 w-12" />
            </button>
          )}

          {/* Main image */}
          <div className="relative w-full h-full max-w-7xl max-h-screen p-12">
            <Image
              src={images[selectedIndex]}
              alt={`${alt} - ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
