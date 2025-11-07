"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ParallaxCard } from "@/components/parallax-card"
// import { ActivityHeatmap } from "@/components/activity-heatmap"
import { Github, Linkedin, Mail, ArrowRight, Send } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
// type Project = {
//   id: string
//   name: string
//   description: string
//   cover_image?: string
//   tags: string[]
//   codebase_link?: string
//   deployment_link?: string
// }

const skills = ["Node.js", "Python", "PostgreSQL", "Docker", "Next.js", "Machine Learning", "AWS", "Linux"]

type BlogPost = {
  id: string
  title: string
  summary: string
  content: string
  date: string
  tags: string[]
  cover_image: string
  read_time: number
}

export default function HomePage() {
  const [projects, setProjects] = useState<any[]>([])
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3)
      
      // Fetch blogs
      const { data: blogsData, error: blogsError } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3)

      if (projectsError) console.error("Error fetching projects:", projectsError)
      else setProjects(projectsData || [])
      
      if (blogsError) console.error("Error fetching blogs:", blogsError)
      else setBlogs(blogsData || [])
      
      setLoading(false)
    }

    fetchData()
  }, [])
  if (loading) {
    return (
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 text-center font-mono">Loading content...</div>
      </section>
    )
  }

  const recentBlogs = blogs.slice(0, 3)

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background Media */}
        {/* <div className="absolute inset-0 opacity-5">
          <Image src="/placeholder.svg?height=1080&width=1920" alt="Coding background" fill className="object-cover" />
        </div> */}

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <ParallaxCard className="space-y-8" disableTilt={true}>
              <div className="space-y-4">
                <div className="font-mono text-lg text-muted-foreground">
                  <span className="text-primary">$</span> whoami
                </div>
                <h1 className="font-mono text-4xl md:text-6xl font-bold">
                  Hey, I'm <span className="text-primary">Ak</span>.
                </h1>
                <div className="font-mono text-xl md:text-2xl text-muted-foreground space-y-2">
                  <div> Developer | Builder | Explorer </div>
                  <div className="text-sm md:text-base mt-4 leading-relaxed">
                    I build projects out of curiosity, explore the tech world to have fun,
                    <br /> and also enjoy leading and putting myself out in the world.
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild className="font-mono group">
                  <Link href="#about">
                    About Me
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="font-mono">
                  <Link href="#projects">Projects</Link>
                </Button>
                <Button asChild variant="outline" className="font-mono">
                  <Link href="https://drive.google.com/file/d/18iy3XsQvZ6LdHnsSFQSnf_SeaWvNawv2/view" target="_blank" rel="noopener noreferrer">Resume</Link>
                </Button>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://github.com/ak-1344" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://linkedin.com/in/aditya1344" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="mailto:adityakhatkar97.3@gmail.com">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </ParallaxCard>

            {/* Right Side - Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <ParallaxCard intensity={15} disableTilt={true}>
                <div className="relative group">
                  <div className="w-80 h-80 rounded-full border-2 border-primary/20 p-2 hover:border-primary/40 transition-colors group-hover:scale-105 duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-muted">
                      <Image
                        src="/profilePic.jpg"
                        alt="Ak's Profile"
                        width={320}
                        height={320}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 font-mono text-sm text-muted-foreground bg-background border rounded px-2 py-1 group-hover:scale-110 transition-transform">
                    ./ak.jpeg
                  </div>
                </div>
              </ParallaxCard>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-mono text-4xl font-bold">About Me</h2>
            <p className="font-mono text-muted-foreground text-lg max-w-2xl mx-auto">
              Backend developer passionate about building scalable systems and exploring AI.
            </p>
          </div>

            <div className="flex justify-center">
            <div className="w-full max-w-3xl" style={{ width: "60vw" }}>
              <ParallaxCard disableTilt={true}>
              <Card>
                <CardHeader>
                <CardTitle className="font-mono">Background</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <p className="font-mono text-sm leading-relaxed">
                  I’m an engineering student driven by curiosity and a passion for building impactful projects. My journey spans club leadership and turning innovative ideas into reality, with hands-on experience in server-side development and backend technologies.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="font-mono text-xs">
                    {skill}
                  </Badge>
                  ))}
                </div>
                <Button asChild className="font-mono mt-4">
                  <Link href="/about">Know Me More</Link>
                </Button>
                </CardContent>
              </Card>
              </ParallaxCard>
            </div>
            </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-muted/20 relative">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-mono text-4xl font-bold">Recent Projects</h2>
            <p className="font-mono text-muted-foreground text-lg">Things I've built and learned from.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ParallaxCard key={project.id} intensity={20}>
                <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={project.cover_image || "/placeholder.svg"}
                      alt={project.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-mono text-lg">{project.name}</CardTitle>
                    <CardDescription className="font-mono text-sm">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tags?.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="font-mono text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags?.length > 3 && (
                        <Badge variant="outline" className="font-mono text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4">
                      {project.codebase_link && (
                        <Button size="sm" variant="outline" asChild className="font-mono">
                          <a href={project.codebase_link} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                      <Button size="sm" asChild className="font-mono">
                        <Link href={`/projects/${project.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ParallaxCard>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" className="font-mono">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="py-24 relative">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-mono text-4xl font-bold">Latest Blogs</h2>
            <p className="font-mono text-muted-foreground text-lg">
              Thoughts on backend development, ML, and building things.
            </p>
          </div>

          {recentBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-mono text-muted-foreground">No blog posts available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentBlogs.map((post) => (
                <ParallaxCard key={post.id} intensity={15}>
                  <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        src={post.cover_image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-2">
                        <span>{new Date(post.date || post.created_at || '').toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.read_time} min read</span>
                      </div>
                      <CardTitle className="font-mono text-lg group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="font-mono text-sm">{post.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="font-mono text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" asChild className="font-mono">
                        <Link href={`/blogs/${post.id}`}>Read More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </ParallaxCard>
              ))}
            </div>
          )}

          <div className="text-center">
            <Button asChild variant="outline" className="font-mono">
              <Link href="/blogs">
                View All Blogs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-mono text-4xl font-bold">Get In Touch</h2>
            <p className="font-mono text-muted-foreground text-lg">Let's build something amazing together.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <ParallaxCard>
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono">Send a Message</CardTitle>
                  <CardDescription className="font-mono">I'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-mono">
                          Name
                        </Label>
                        <Input id="name" className="font-mono" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-mono">
                          Email
                        </Label>
                        <Input id="email" type="email" className="font-mono" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-mono">
                        Message
                      </Label>
                      <Textarea id="message" className="font-mono min-h-[100px]" />
                    </div>
                    <Button type="submit" className="w-full font-mono">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ParallaxCard>

            <div className="space-y-6">
              <ParallaxCard>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono">Connect With Me</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <a
                      href="mailto:adityakhatkar97.3@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors font-mono"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">adityakhatkar97.3@gmail.com</div>
                      </div>
                    </a>
                    <a
                      href="https://github.com/ak-1344"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors font-mono"
                    >
                      <Github className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">GitHub</div>
                        <div className="text-sm text-muted-foreground">@ak-1344</div>
                      </div>
                    </a>
                    <a
                      href="https://linkedin.com/in/aditya1344"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors font-mono"
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">LinkedIn</div>
                        <div className="text-sm text-muted-foreground">Aditya</div>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              </ParallaxCard>

              <ParallaxCard>
                <Card>
                  <CardContent className="pt-6">
                    <blockquote className="font-mono text-sm leading-relaxed">
                      <p className="mb-4">
                        "The best way to fill your needs is to build a solution for it. 
                        <br />Every great product starts with a simple idea and grows through iteration, collaboration, and relentless improvement."
                      </p>
                      <footer className="text-muted-foreground">~ My approach to development</footer>
                    </blockquote>
                  </CardContent>
                </Card>
              </ParallaxCard>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="font-mono text-sm text-muted-foreground">
              © 2025 Ak. Built with passion and curiosity ☕
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/ak-1344" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://linkedin.com/in/aditya1344" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="mailto:adityakhatkar97.3@gmail.com">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
              <Link href="/admin" className="font-mono text-xs text-muted-foreground hover:text-primary ml-4">
                &gt;_
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
