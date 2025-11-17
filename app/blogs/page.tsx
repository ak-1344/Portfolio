"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import type { Blog } from "@/types"
import { getBlogExcerpt, getBlogReadTime, formatDate } from "@/lib/helpers"

export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false })
      if (error) {
        console.error("Error fetching blogs:", error)
      } else {
        setBlogPosts(data || [])
      }
      setLoading(false)
    }

    fetchBlogs()
  }, [])
  
  const recentPosts = blogPosts.slice(0, 3)
  const popularTags = [...new Set(blogPosts.flatMap(post => post.tags))].slice(0, 5)

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="space-y-8 md:space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-mono text-3xl md:text-4xl font-bold">Blog Posts</h1>
          <p className="font-mono text-muted-foreground text-base md:text-lg">
            Thoughts on backend development, ML, and building things.
          </p>
        </div>

        {/* Blog Posts */}
        {loading ? (
            <div className="text-center py-12">
              <p className="font-mono text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-mono text-muted-foreground">No blog posts found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {blogPosts.map((post) => {
                const excerpt = getBlogExcerpt(post)
                const readTime = getBlogReadTime(post)
                return (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className="aspect-video md:aspect-square overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                          <Image
                            src={post.cover_image || "/placeholder.svg"}
                            alt={post.title}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.created_at)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {readTime} min read
                            </div>
                          </div>
                          <CardTitle className="font-mono text-xl">{post.title}</CardTitle>
                          <CardDescription className="font-mono preserve-whitespace">
                            {excerpt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {post.tags?.map((tag) => (
                              <Badge key={tag} variant="secondary" className="font-mono text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button asChild className="font-mono">
                            <Link href={`/blogs/${post.id}`}>Read More</Link>
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Recent Posts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="space-y-2">
                  <Link
                    href={`/blogs/${post.id}`}
                    className="font-mono text-sm font-medium hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                  <p className="font-mono text-xs text-muted-foreground">{formatDate(post.created_at)}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.length > 0 ? (
                  popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="font-mono text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <p className="font-mono text-xs text-muted-foreground">No tags available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
