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
import { CertificationCard } from "@/components/certification-card"
import { ResumeButton } from "@/components/pdf-viewer"
// import { ActivityHeatmap } from "@/components/activity-heatmap"
import { Github, Linkedin, Mail, ArrowRight, Send, Pin, CheckCircle, AlertCircle, Award } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import type { Project, Certification } from "@/types"
import { formatDate, isValidEmail } from "@/lib/helpers"

const skills = ["Node.js", "Python", "PostgreSQL", "Docker", "Next.js", "Machine Learning", "AWS", "Linux"]

export default function HomePage() {
  const [pinnedProjects, setPinnedProjects] = useState<Project[]>([])
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      // Fetch pinned projects (max 3)
      const { data: pinnedData, error: pinnedError } = await supabase
        .from("projects")
        .select("*")
        .eq("is_pinned", true)
        .order("pin_order", { ascending: true, nullsFirst: false })
        .limit(3)

      // Fetch recent projects (excluding pinned ones)
      const pinnedIds = pinnedData?.map(p => p.id) || []
      const { data: recentData, error: recentError } = await supabase
        .from("projects")
        .select("*")
        .not("id", "in", `(${pinnedIds.join(",") || "null"})`)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(3)
      
      // Fetch certifications
      const { data: certificationsData, error: certificationsError } = await supabase
        .from("certifications")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .order("issue_date", { ascending: false })
        .limit(6)

      if (pinnedError) console.error("Error fetching pinned projects:", pinnedError)
      else setPinnedProjects(pinnedData || [])

      if (recentError) console.error("Error fetching recent projects:", recentError)
      else setRecentProjects(recentData || [])
      
      if (certificationsError) console.error("Error fetching certifications:", certificationsError)
      else setCertifications(certificationsData || [])
      
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus("idle")
    setErrorMessage("")

    if (!contactForm.name.trim()) {
      setSubmitStatus("error")
      setErrorMessage("Please enter your name")
      return
    }
    if (!isValidEmail(contactForm.email)) {
      setSubmitStatus("error")
      setErrorMessage("Please enter a valid email address")
      return
    }
    if (!contactForm.message.trim() || contactForm.message.trim().length < 10) {
      setSubmitStatus("error")
      setErrorMessage("Message must be at least 10 characters long")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([{
          name: contactForm.name.trim(),
          email: contactForm.email.trim(),
          message: contactForm.message.trim(),
          subject: null,
          status: "unread"
        }])

      if (error) {
        console.error("Supabase error:", error)
        throw error
      }

      setSubmitStatus("success")
      setContactForm({ name: "", email: "", message: "" })
    } catch (error: any) {
      console.error("Error submitting contact form:", error)
      setSubmitStatus("error")
      setErrorMessage(error?.message || "Failed to send message. Please try again or email directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 text-center font-mono">Loading content...</div>
      </section>
    )
  }

  // Combine pinned and recent projects for display
  const displayProjects = [...pinnedProjects, ...recentProjects].slice(0, 6)

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
                  Hey, I'm <span className="text-primary">Aditya</span>.
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
                <ResumeButton variant="outline" className="font-mono" />
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
                <div className="relative group flex justify-center">
                  <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-primary/20 p-2 hover:border-primary/40 transition-colors group-hover:scale-105 duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-muted">
                      <Image
                        src="/profilePic.jpg"
                        alt="Aditya's Profile"
                        width={320}
                        height={320}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 font-mono text-sm text-muted-foreground bg-background border rounded px-2 py-1 group-hover:scale-110 transition-transform">
                    ./aditya.jpeg
                  </div>
                </div>
              </ParallaxCard>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-12 md:py-24 relative">
        <div className="container mx-auto px-4 space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-mono text-3xl md:text-4xl font-bold">About Me</h2>
            <p className="font-mono text-muted-foreground text-lg max-w-2xl mx-auto">
              Backend developer passionate about building scalable systems and exploring AI.
            </p>
          </div>

            <div className="flex justify-center">
            <div className="w-full max-w-3xl px-4 md:px-0" style={{ width: "100%", maxWidth: "min(90vw, 48rem)" }}>
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
      <section id="projects" className="py-12 md:py-24 bg-muted/20 relative">
        <div className="container mx-auto px-4 space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-mono text-3xl md:text-4xl font-bold">Projects</h2>
            <p className="font-mono text-muted-foreground text-lg">Things I've built and learned from.</p>
          </div>

          {/* Pinned Projects Section */}
          {pinnedProjects.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Pin className="h-5 w-5 text-primary" />
                <h3 className="font-mono text-xl font-semibold">Featured Projects</h3>
              </div>
              <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-w-max md:min-w-0">
                {pinnedProjects.map((project) => (
                  <ParallaxCard key={project.id} intensity={20}>
                    <Card className="card-pinned group hover:shadow-lg transition-all duration-300 h-full w-[280px] md:w-auto flex-shrink-0">
                      <div className="aspect-video overflow-hidden rounded-t-lg relative">
                        <Image
                          src={project.cover_image || "/placeholder.svg"}
                          alt={project.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="pin-badge">📌 #{project.pin_order}</span>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="font-mono text-lg">{project.name}</CardTitle>
                        <CardDescription className="font-mono text-sm preserve-whitespace">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                        <div className="flex flex-wrap gap-1">
                          {project.tags?.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="font-mono text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags && project.tags.length > 3 && (
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
              </div>
            </div>
          )}

          {/* Recent Projects Section */}
          {recentProjects.length > 0 && (
            <div className="space-y-6">
              {pinnedProjects.length > 0 && (
                <h3 className="font-mono text-xl font-semibold">Recent Projects</h3>
              )}
              <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-w-max md:min-w-0">
                {recentProjects.map((project) => (
                  <ParallaxCard key={project.id} intensity={20}>
                    <Card className="group hover:shadow-lg transition-all duration-300 h-full w-[280px] md:w-auto flex-shrink-0">
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
                        <CardDescription className="font-mono text-sm preserve-whitespace">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                        <div className="flex flex-wrap gap-1">
                          {project.tags?.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="font-mono text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags && project.tags.length > 3 && (
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
              </div>
            </div>
          )}

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

      {/* Certifications Section */}
      <section id="certifications" className="py-12 md:py-24 relative">
        <div className="container mx-auto px-4 space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Award className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              <h2 className="font-mono text-3xl md:text-4xl font-bold">Certifications</h2>
            </div>
            <p className="font-mono text-muted-foreground text-base md:text-lg">
              Professional credentials showcasing my expertise and continuous learning.
            </p>
          </div>

          {certifications.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="font-mono text-muted-foreground">No certifications available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((certification) => (
                <ParallaxCard key={certification.id} intensity={15}>
                  <CertificationCard certification={certification} />
                </ParallaxCard>
              ))}
            </div>
          )}

          <div className="text-center">
            <Button asChild variant="outline" className="font-mono">
              <Link href="/certifications">
                View All Certifications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-24 relative">
        <div className="container mx-auto px-4 space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-mono text-3xl md:text-4xl font-bold">Get In Touch</h2>
            <p className="font-mono text-muted-foreground text-base md:text-lg">Let's build something amazing together.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <ParallaxCard>
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono">Send a Message</CardTitle>
                  <CardDescription className="font-mono">I'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="home-name" className="font-mono">
                          Name
                        </Label>
                        <Input 
                          id="home-name" 
                          className="font-mono" 
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="home-email" className="font-mono">
                          Email
                        </Label>
                        <Input 
                          id="home-email" 
                          type="email" 
                          className="font-mono" 
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="home-message" className="font-mono">
                        Message
                      </Label>
                      <Textarea 
                        id="home-message" 
                        className="font-mono min-h-[100px]" 
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                    
                    {submitStatus === "success" && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <p className="font-mono text-sm">Message sent successfully! I'll get back to you soon.</p>
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        <p className="font-mono text-sm">{errorMessage}</p>
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full font-mono" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
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
              © 2025 Aditya. Built with passion and curiosity ☕
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
