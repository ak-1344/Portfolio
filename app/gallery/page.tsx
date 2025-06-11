"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ParallaxCard } from "@/components/parallax-card"
import { mediaItems } from "@/lib/media-data"
import { Search, ExternalLink, Copy, Eye, Filter, Edit } from "lucide-react"

const categories = ["All", "Blogs", "Projects", "NOW", "Profile", "UI"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMedia = mediaItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.usedIn.some((usage) => usage.type.toLowerCase() === selectedCategory.toLowerCase()) ||
      (selectedCategory === "UI" && item.tags.includes("ui"))

    const matchesSearch =
      searchQuery === "" ||
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"]
    if (bytes === 0) return "0 Bytes"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="font-mono text-4xl font-bold">Media Gallery</h1>
        <p className="font-mono text-muted-foreground text-lg">
          Visual assets used across projects, blogs, and portfolio pages.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search media files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 font-mono"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="font-mono"
            >
              <Filter className="h-3 w-3 mr-1" />
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-mono font-bold">{mediaItems.length}</div>
            <div className="text-sm font-mono text-muted-foreground">Total Files</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-mono font-bold">{filteredMedia.length}</div>
            <div className="text-sm font-mono text-muted-foreground">Filtered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-mono font-bold">
              {Math.round((mediaItems.reduce((acc, item) => acc + item.size, 0) / 1024 / 1024) * 100) / 100}
            </div>
            <div className="text-sm font-mono text-muted-foreground">MB Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-mono font-bold">{new Set(mediaItems.flatMap((item) => item.tags)).size}</div>
            <div className="text-sm font-mono text-muted-foreground">Unique Tags</div>
          </CardContent>
        </Card>
      </div>

      {/* Media Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <ParallaxCard key={item.id} intensity={15}>
            <Card className="group hover:shadow-lg transition-all duration-300 h-full">
              <div className="aspect-video overflow-hidden rounded-t-lg relative">
                <Image
                  src={item.url || "/placeholder.svg"}
                  alt={item.caption || item.filename}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => copyToClipboard(item.url)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" asChild>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="font-mono text-lg">{item.caption || item.filename}</CardTitle>
                <CardDescription className="font-mono text-sm">{item.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-mono text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Usage Information */}
                  <div className="space-y-2">
                    <div className="font-mono text-xs font-semibold text-muted-foreground">Used In:</div>
                    {item.usedIn.map((usage, index) => (
                      <div key={index} className="flex items-center justify-between text-xs font-mono">
                        <span className="truncate">{usage.title}</span>
                        {usage.id && (
                          <Button size="sm" variant="ghost" asChild className="h-6 px-2">
                            <Link href={`/${usage.type}s/${usage.id}`}>
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* File Info */}
                  <div className="pt-2 border-t space-y-1 text-xs font-mono text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{formatFileSize(item.size)}</span>
                    </div>
                    {item.dimensions && (
                      <div className="flex justify-between">
                        <span>Dimensions:</span>
                        <span>
                          {item.dimensions.width}×{item.dimensions.height}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Uploaded:</span>
                      <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(item.url)}
                    className="font-mono flex-1"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Link
                  </Button>
                  <Button size="sm" variant="outline" asChild className="font-mono">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild className="font-mono">
                    <Link href={`/admin/media/${item.id}`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ParallaxCard>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <div className="font-mono text-muted-foreground">No media files found matching your criteria.</div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
            }}
            className="font-mono mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
