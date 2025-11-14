"use client"

import { CldUploadWidget } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface CloudinaryUploadProps {
  value?: string[]
  onChange?: (value: string[]) => void
  maxFiles?: number
  folder?: string
}

export function CloudinaryUpload({
  value = [],
  onChange,
  maxFiles = 10,
  folder = 'properties'
}: CloudinaryUploadProps) {
  const [images, setImages] = useState<string[]>(value)

  const handleUpload = (result: any) => {
    if (result.event === 'success') {
      const newImages = [...images, result.info.secure_url]
      setImages(newImages)
      onChange?.(newImages)
    }
  }

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    onChange?.(newImages)
  }

  const canUploadMore = images.length < maxFiles

  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                  Main Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {canUploadMore && (
        <CldUploadWidget
          uploadPreset="real-estate-uploads"
          options={{
            maxFiles: maxFiles - images.length,
            folder: folder,
            resourceType: 'image',
          }}
          onSuccess={handleUpload}
        >
          {({ open }) => (
            <Button
              type="button"
              variant="outline"
              onClick={() => open()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Images ({images.length}/{maxFiles})
            </Button>
          )}
        </CldUploadWidget>
      )}

      <p className="text-sm text-muted-foreground">
        First image will be used as the main property image.
        {canUploadMore && ` You can upload ${maxFiles - images.length} more image(s).`}
      </p>
    </div>
  )
}
