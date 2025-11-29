"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import type { Blog } from "@/types"
import { formatDate, getBlogReadTime } from "@/lib/helpers"

interface BlogPageProps {
  params: Promise<{
    id: string
  }>
}

export default function BlogPage({ params }: BlogPageProps) {
  const { id } = use(params)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogData()
  }, [id])

  const fetchBlogData = async () => {
    setLoading(true)
    try {
      // Fetch main blog post
      const { data: blogData, error: blogError } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single()

      if (blogError) throw blogError
      if (!blogData) {
        notFound()
      }

      setBlog(blogData)

      // Fetch related blogs based on shared tags
      if (blogData.tags && blogData.tags.length > 0) {
        const { data: relatedData } = await supabase
          .from("blogs")
          .select("*")
          .neq("id", id)
          .overlaps("tags", blogData.tags)
          .order("created_at", { ascending: false })
          .limit(3)

        setRelatedBlogs(relatedData || [])
      }
    } catch (error) {
      console.error("Error fetching blog:", error)
      notFound()
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="skeleton-card h-96" />
      </div>
    )
  }

  if (!blog) {
    return notFound()
  }

  const readTime = getBlogReadTime(blog)

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="font-mono">
        <Link href="/blogs">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blogs
        </Link>
      </Button>

      {/* GitHub-Style Layout */}
      <div className="project-detail-layout">
        {/* Sidebar - Image and Quick Info */}
        <div className="project-detail-sidebar">
          {/* Cover Image */}
          <div className="rounded-lg overflow-hidden border">
            <Image
              src={blog.cover_image || "/placeholder.svg"}
              alt={blog.title}
              width={300}
              height={200}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-lg">Blog Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Author */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
                  <User className="h-4 w-4" />
                  Author
                </div>
                <p className="font-mono text-sm font-semibold">{blog.author}</p>
              </div>

              {/* Published Date */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
                  <Calendar className="h-4 w-4" />
                  Published
                </div>
                <p className="font-mono text-sm">{formatDate(blog.created_at)}</p>
              </div>

              {/* Read Time */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
                  <Clock className="h-4 w-4" />
                  Read Time
                </div>
                <p className="font-mono text-sm">{readTime} min read</p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-mono text-sm font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1">
                  {blog.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Share Button */}
              <Button 
                className="w-full font-mono" 
                variant="outline"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      text: blog.excerpt || blog.summary,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="project-detail-content">
          {/* Title */}
          <div>
            <h1 className="font-mono text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
            
            {/* Excerpt/Summary */}
            {(blog.excerpt || blog.summary) && (
              <div className="prose max-w-none mb-6">
                <p className="font-mono text-lg text-muted-foreground leading-relaxed preserve-whitespace">
                  {blog.excerpt || blog.summary}
                </p>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <div className="font-mono text-base leading-relaxed preserve-whitespace text-foreground whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>

          {/* Additional Images */}
          {blog.images && blog.images.length > 0 && (
            <div className="space-y-4 mt-8">
              <h3 className="font-mono text-xl font-semibold">Images</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {blog.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border">
                    <Image
                      src={image}
                      alt={`${blog.title} - Image ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <div className="space-y-6 pt-8 border-t">
          <h2 className="font-mono text-2xl font-bold">Related Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedBlogs.map((relatedBlog) => (
              <Card key={relatedBlog.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-mono text-base">{relatedBlog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm text-muted-foreground mb-4 line-clamp-2">
                    {relatedBlog.excerpt || relatedBlog.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatDate(relatedBlog.created_at, 'short')}
                    </span>
                    <Button size="sm" asChild className="font-mono">
                      <Link href={`/blogs/${relatedBlog.id}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
