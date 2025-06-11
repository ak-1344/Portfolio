"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MediaPicker } from "@/components/media-picker"
import { useToast } from "@/components/ui/toast"
import { ArrowLeft, Plus, X, Github, ExternalLink, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { MediaItem } from "@/lib/media-data"
import { blogPosts } from "@/lib/data"

interface ProjectFormData {
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: string
  github?: string
  demo?: string
  images: MediaItem[]
  challenges?: string
  learnings?: string
  timeline?: string
  relatedBlog?: string
  status: "active" | "completed" | "archived"
}

const categories = ["Backend", "Frontend", "ML", "DevOps", "Personal", "Club"]

export default function CreateProjectPage() {
  const router = useRouter()
  const { addToast, ToastContainer } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [newTech, setNewTech] = useState("")
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    longDescription: "",
    tech: [],
    category: "",
    images: [],
    status: "active",
  })

  const addTech = () => {
    if (newTech.trim() && !formData.tech.includes(newTech.trim())) {
      setFormData((prev) => ({
        ...prev,
        tech: [...prev.tech, newTech.trim()],
      }))
      setNewTech("")
    }
  }

  const removeTech = (techToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tech: prev.tech.filter((tech) => tech !== techToRemove),
    }))
  }

  const addImage = (media: MediaItem) => {
    if (!formData.images.find((img) => img.id === media.id)) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, media],
      }))
    }
  }

  const removeImage = (imageId: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Saving project:", formData)

      addToast({
        type: "success",
        title: "Project Saved!",
        description: `Project "${formData.title}" has been created successfully.`,
      })

      // Redirect after success
      setTimeout(() => {
        router.push("/admin")
      }, 2000)
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        description: "Failed to save project. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <ToastContainer />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="font-mono">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Link>
          </Button>
          <div>
            <h1 className="font-mono text-4xl font-bold">Create Project</h1>
            <p className="font-mono text-muted-foreground">Showcase your latest work</p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading || !formData.title.trim() || !formData.description.trim()}
          className="font-mono"
        >
          {isLoading ? "Saving..." : "Save Project"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-mono">
                  Project Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter project title..."
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-mono">
                  Short Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description for project cards..."
                  className="font-mono"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription" className="font-mono">
                  Detailed Description
                </Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, longDescription: e.target.value }))}
                  placeholder="Comprehensive project description for the project page..."
                  className="font-mono"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github" className="font-mono">
                    GitHub URL
                  </Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="github"
                      value={formData.github || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                      placeholder="https://github.com/..."
                      className="font-mono pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demo" className="font-mono">
                    Live Demo URL
                  </Label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="demo"
                      value={formData.demo || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, demo: e.target.value }))}
                      placeholder="https://demo.example.com"
                      className="font-mono pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Project Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="challenges" className="font-mono">
                  Challenges Faced
                </Label>
                <Textarea
                  id="challenges"
                  value={formData.challenges || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, challenges: e.target.value }))}
                  placeholder="What challenges did you encounter during development?"
                  className="font-mono"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="learnings" className="font-mono">
                  Key Learnings
                </Label>
                <Textarea
                  id="learnings"
                  value={formData.learnings || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, learnings: e.target.value }))}
                  placeholder="What did you learn from this project?"
                  className="font-mono"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline" className="font-mono">
                  Timeline
                </Label>
                <Input
                  id="timeline"
                  value={formData.timeline || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                  placeholder="e.g., 3 months, 6 weeks..."
                  className="font-mono"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Project Images</CardTitle>
              <CardDescription className="font-mono">Add screenshots, diagrams, or other visual assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {formData.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-video overflow-hidden rounded-lg border">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.caption || image.filename}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(image.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="mt-2 font-mono text-xs text-muted-foreground truncate">
                      {image.caption || image.filename}
                    </div>
                  </div>
                ))}

                <MediaPicker
                  onSelect={addImage}
                  trigger={
                    <div className="aspect-video border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <div className="font-mono text-sm text-muted-foreground">Add Image</div>
                      </div>
                    </div>
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Project Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-mono">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="font-mono">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="font-mono">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-mono">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active" className="font-mono">
                      Active
                    </SelectItem>
                    <SelectItem value="completed" className="font-mono">
                      Completed
                    </SelectItem>
                    <SelectItem value="archived" className="font-mono">
                      Archived
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-mono">Related Blog Post</Label>
                <Select
                  value={formData.relatedBlog || ""}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, relatedBlog: value }))}
                >
                  <SelectTrigger className="font-mono">
                    <SelectValue placeholder="Select blog post" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="" className="font-mono">
                      None
                    </SelectItem>
                    {blogPosts.map((post) => (
                      <SelectItem key={post.id} value={post.id} className="font-mono">
                        {post.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Tech Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add technology..."
                  className="font-mono"
                  onKeyPress={(e) => e.key === "Enter" && addTech()}
                />
                <Button size="sm" onClick={addTech} className="font-mono">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tech.map((tech) => (
                  <Badge key={tech} variant="secondary" className="font-mono">
                    {tech}
                    <button onClick={() => removeTech(tech)} className="ml-2 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              {formData.tech.length === 0 && (
                <div className="text-sm text-muted-foreground font-mono">No technologies added yet</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Project Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-mono text-sm">Images</div>
                <div className="font-mono text-sm text-muted-foreground">{formData.images.length} uploaded</div>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-sm">Technologies</div>
                <div className="font-mono text-sm text-muted-foreground">{formData.tech.length} added</div>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-sm">Description Length</div>
                <div className="font-mono text-sm text-muted-foreground">
                  {formData.longDescription.length} characters
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
