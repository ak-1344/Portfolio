"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { mediaItems, type MediaItem } from "@/lib/media-data"
import { Search, Upload, Check } from "lucide-react"

interface MediaPickerProps {
  onSelect: (media: MediaItem) => void
  selectedMedia?: MediaItem
  trigger?: React.ReactNode
}

export function MediaPicker({ onSelect, selectedMedia, trigger }: MediaPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredMedia = mediaItems.filter(
    (item) =>
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSelect = (media: MediaItem) => {
    onSelect(media)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="font-mono">
            <Upload className="h-4 w-4 mr-2" />
            Select Media
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="font-mono">Select Media</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search media files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-mono"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredMedia.map((item) => (
              <Card
                key={item.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMedia?.id === item.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleSelect(item)}
              >
                <div className="aspect-video overflow-hidden rounded-t-lg relative">
                  <Image
                    src={item.url || "/placeholder.svg"}
                    alt={item.caption || item.filename}
                    width={200}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                  {selectedMedia?.id === item.id && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Check className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <h4 className="font-mono text-sm font-semibold truncate">{item.caption || item.filename}</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="font-mono text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="font-mono text-sm text-muted-foreground">{filteredMedia.length} media files</div>
            <Button variant="outline" className="font-mono">
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
