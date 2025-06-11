"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaPicker } from "@/components/media-picker"
import { useToast } from "@/components/ui/toast"
import { ArrowLeft, Save, Upload, X, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { MediaItem } from "@/lib/media-data"

interface BlogFormData {
  title: string
  slug: string
  summary: string
  content: string
  tags: string[]
  coverImage?: MediaItem
  readTime: number
  status: "draft" | "published"
}

export default function CreateBlogPage() {
  const router = useRouter()
  const { addToast, ToastContainer } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    summary: "",
    content: "",
    tags: [],
    readTime: 0,
    status: "draft",
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
      readTime: calculateReadTime(content),
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (status: "draft" | "published") => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const blogData = { ...formData, status }
      console.log("Saving blog:", blogData)

      addToast({
        type: "success",
        title: "Blog Saved!",
        description: `Blog post "${formData.title}" has been ${status === "published" ? "published" : "saved as draft"}.`,
      })

      // Redirect after success
      setTimeout(() => {
        router.push("/admin")
      }, 2000)
    } catch (error) {
      addToast({
        type: "error",
        title: "Error",
        description: "Failed to save blog post. Please try again.",
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
            <h1 className="font-mono text-4xl font-bold">Create Blog Post</h1>
            <p className="font-mono text-muted-foreground">Write and publish your thoughts</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSubmit("draft")}
            disabled={isLoading || !formData.title.trim()}
            className="font-mono"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSubmit("published")}
            disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
            className="font-mono"
          >
            {isLoading ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-mono">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter blog post title..."
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="font-mono">
                  Slug
                </Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="blog-post-url"
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary" className="font-mono">
                  Summary
                </Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                  placeholder="Brief description of your blog post..."
                  className="font-mono"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Content</CardTitle>
              <CardDescription className="font-mono">Write your blog post content in Markdown format</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="write" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="write" className="font-mono">
                    Write
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="font-mono">
                    Preview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="write" className="space-y-4">
                  <Textarea
                    value={formData.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="# Your Blog Post Title

Write your content here using Markdown syntax...

## Subheading

- List item 1
- List item 2

```javascript
// Code example
console.log('Hello, world!');
```"
                    className="font-mono min-h-[400px] resize-none"
                  />
                  <div className="text-sm text-muted-foreground font-mono">
                    Estimated reading time: {formData.readTime} minute{formData.readTime !== 1 ? "s" : ""}
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <div className="border rounded-lg p-6 min-h-[400px] bg-muted/20">
                    <div className="prose prose-neutral dark:prose-invert max-w-none font-mono">
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {formData.content || "Nothing to preview yet. Start writing in the Write tab."}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.coverImage ? (
                <div className="space-y-3">
                  <div className="aspect-video overflow-hidden rounded-lg border">
                    <Image
                      src={formData.coverImage.url || "/placeholder.svg"}
                      alt={formData.coverImage.caption || "Cover image"}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-sm">
                      {formData.coverImage.caption || formData.coverImage.filename}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setFormData((prev) => ({ ...prev, coverImage: undefined }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <MediaPicker
                  onSelect={(media) => setFormData((prev) => ({ ...prev, coverImage: media }))}
                  trigger={
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <div className="font-mono text-sm text-muted-foreground">Click to select cover image</div>
                    </div>
                  }
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  className="font-mono"
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button size="sm" onClick={addTag} className="font-mono">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-mono">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-2 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              {formData.tags.length === 0 && (
                <div className="text-sm text-muted-foreground font-mono">No tags added yet</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-mono text-sm">Status</div>
                <Badge variant={formData.status === "published" ? "default" : "secondary"} className="font-mono">
                  {formData.status === "published" ? "Published" : "Draft"}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-sm">Reading Time</div>
                <div className="font-mono text-sm text-muted-foreground">
                  {formData.readTime} minute{formData.readTime !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-sm">Word Count</div>
                <div className="font-mono text-sm text-muted-foreground">
                  {formData.content.split(/\s+/).filter((word) => word.length > 0).length} words
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
