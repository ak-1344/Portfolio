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
import { ActivityHeatmap } from "@/components/activity-heatmap"
import { projects, blogPosts } from "@/lib/data"
import { mediaItems } from "@/lib/media-data"
import { Github, Linkedin, Mail, ArrowRight, Send, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef } from "react"

const skills = ["Node.js", "Python", "PostgreSQL", "Docker", "Next.js", "Machine Learning", "AWS", "Linux"]

export default function HomePage() {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  const recentProjects = projects.slice(0, 3)
  const recentBlogs = blogPosts.slice(0, 3)
  const galleryItems = mediaItems.slice(0, 6)

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = 300
      galleryRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background Media */}
        <div className="absolute inset-0 opacity-5">
          <Image src="/placeholder.svg?height=1080&width=1920" alt="Coding background" fill className="object-cover" />
        </div>

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
                  <div>Backend Developer | Builder | Explorer</div>
                  <div className="text-sm md:text-base mt-4 leading-relaxed">
                    I build scalable systems, write thoughtful blogs,
                    <br />
                    and explore AI, EEG, and real-world data.
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
                  <Link href="#contact">Contact</Link>
                </Button>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="mailto:ak@example.com">
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
                        src="/placeholder.svg?height=320&width=320"
                        alt="Ak's Profile"
                        width={320}
                        height={320}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 font-mono text-sm text-muted-foreground bg-background border rounded px-2 py-1 group-hover:scale-110 transition-transform">
                    ./ak.jpg
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

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ParallaxCard disableTilt={true}>
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono">Background</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-mono text-sm leading-relaxed">
                    I'm a backend-focused engineering student with a passion for building robust, scalable systems. My
                    journey spans from club leadership to ML research, with hands-on experience in EEG signal processing
                    and real-world data analysis.
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

            <div className="space-y-6">
              <h3 className="font-mono text-xl font-bold">Activity Overview</h3>
              <ActivityHeatmap title="Learning & Building Days" className="scale-90 origin-left" />
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
            {recentProjects.map((project, index) => (
              <ParallaxCard key={project.id} intensity={20}>
                <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-mono text-lg">{project.title}</CardTitle>
                    <CardDescription className="font-mono text-sm">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-mono text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="outline" className="font-mono text-xs">
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4">
                      {project.github && (
                        <Button size="sm" variant="outline" asChild className="font-mono">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlogs.map((post) => (
              <ParallaxCard key={post.id} intensity={15}>
                <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-2">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    <CardTitle className="font-mono text-lg group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="font-mono text-sm">{post.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
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

      {/* Gallery Preview Section */}
      <section id="gallery" className="py-24 bg-muted/20 relative">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-mono text-4xl font-bold">Media Gallery</h2>
            <p className="font-mono text-muted-foreground text-lg">
              Visual stories from projects, blogs, and development journey.
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" size="sm" onClick={() => scrollGallery("left")} className="font-mono">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => scrollGallery("right")} className="font-mono">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div
              ref={galleryRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {galleryItems.map((item) => (
                <ParallaxCard key={item.id} intensity={10} className="flex-shrink-0">
                  <Card className="w-80 group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        src={item.url || "/placeholder.svg"}
                        alt={item.caption || item.filename}
                        width={320}
                        height={180}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-mono text-sm">{item.caption || item.filename}</CardTitle>
                      <CardDescription className="font-mono text-xs">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="font-mono text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">Used in: {item.usedIn[0]?.title}</div>
                    </CardContent>
                  </Card>
                </ParallaxCard>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button asChild variant="outline" className="font-mono">
              <Link href="/gallery">
                View Full Gallery
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
                      href="mailto:ak@example.com"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors font-mono"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">ak@example.com</div>
                      </div>
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors font-mono"
                    >
                      <Github className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">GitHub</div>
                        <div className="text-sm text-muted-foreground">@ak-dev</div>
                      </div>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors font-mono"
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">LinkedIn</div>
                        <div className="text-sm text-muted-foreground">Ak Developer</div>
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
                        "The best way to predict the future is to build it. Every great system starts with a simple idea
                        and grows through iteration, collaboration, and relentless improvement."
                      </p>
                      <footer className="text-muted-foreground">— My approach to development</footer>
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
              © 2024 Ak. Built with Next.js, Tailwind CSS, and lots of ☕
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="mailto:ak@example.com">
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
