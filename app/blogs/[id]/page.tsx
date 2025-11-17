import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabaseClient"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import type { Blog } from "@/types"
import { getBlogReadTime, formatDate } from "@/lib/helpers"

interface BlogPageProps {
  params: {
    id: string
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  // Fetch the main blog post
  const { data: post, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", params.id)
    .single<Blog>()

  if (!post || error) {
    console.error("Error fetching blog post:", error)
    notFound()
  }

  const readTime = getBlogReadTime(post)

  // Fetch related posts based on tags
  const { data: allPosts } = await supabase
    .from("blogs")
    .select("*")
    .neq("id", post.id)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })
  
  const relatedPosts = allPosts
    ? allPosts
        .filter((p: Blog) => p.tags?.some((tag: string) => post.tags?.includes(tag)))
        .slice(0, 3)
    : []

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back Button */}
      <Button variant="ghost" asChild className="font-mono mb-8">
        <Link href="/blogs">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
      </Button>

      {/* Article Header */}
      <article className="space-y-8">
        <div className="space-y-6">
          <div className="aspect-video overflow-hidden rounded-lg border">
            <Image
              src={post.cover_image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="font-mono text-4xl font-bold leading-tight">{post.title}</h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author || "Ak"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.created_at)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readTime} min read
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-mono">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="font-mono preserve-whitespace leading-relaxed text-base">{post.content}</div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 space-y-6">
          <h2 className="font-mono text-2xl font-bold">Related Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedPosts.map((relatedPost: Blog) => (
              <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-mono text-lg">{relatedPost.title}</CardTitle>
                  <CardDescription className="font-mono text-sm preserve-whitespace line-clamp-2">
                    {relatedPost.excerpt || relatedPost.summary || relatedPost.content.substring(0, 100)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" asChild className="font-mono">
                    <Link href={`/blogs/${relatedPost.id}`}>Read Post</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
