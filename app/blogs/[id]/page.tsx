import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { blogPosts } from "@/lib/data"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

interface BlogPageProps {
  params: {
    id: string
  }
}

export default function BlogPage({ params }: BlogPageProps) {
  const post = blogPosts.find((p) => p.id === params.id)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3)

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
              src={post.coverImage || "/placeholder.svg"}
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
                Ak
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime} min read
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-mono">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none font-mono">
          <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 space-y-6">
          <h2 className="font-mono text-2xl font-bold">Related Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-mono text-lg">{relatedPost.title}</CardTitle>
                  <CardDescription className="font-mono text-sm">{relatedPost.summary}</CardDescription>
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
