"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

type BlogPost = {
  id: string
  title: string
  summary: string
  content: string
  date: string
  tags: string[]
  cover_image: string
  read_time: number
  created_at?: string
}

export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
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
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-4">
            <h1 className="font-mono text-4xl font-bold">Blog</h1>
            <p className="font-mono text-muted-foreground text-lg">
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
              {blogPosts.map((post) => (
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
                            {new Date(post.date || post.created_at || '').toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.read_time} min read
                          </div>
                        </div>
                        <CardTitle className="font-mono text-xl">{post.title}</CardTitle>
                        <CardDescription className="font-mono">{post.summary}</CardDescription>
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
              ))}
            </div>
          )}
        </div>

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
                  <p className="font-mono text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
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
