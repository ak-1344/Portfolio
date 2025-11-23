"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabaseClient"
import type { NowProject } from "@/types"

const skills = {
  Backend: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
  Frontend: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  DevOps: ["Docker", "Linux", "Proxmox", "AWS", "CI/CD"],
  ML: ["Pandas", "scikit-learn", "Numpy", "ML Models"],
}

const timeline = [
  {
    period: "2023 - Present",
    title: "VIT Chennai",
    subtitle: "B.Tech Computer Science (Core)",
    description: "Currently maintaining 8.74 CGPA. Serving as Nexus Club President - a backend-oriented club. Developer by hobby, explorer by passion. Actively involved in building scalable systems and mentoring peers in backend development.",
    icon: "🎓",
  },
  {
    period: "2022 - 2023",
    title: "Gap Year Journey",
    subtitle: "NDA Preparation & SSB",
    description: "Cleared NDA exam twice. Conference OUT in SSB Mysore. A year of discipline, determination, and self-discovery that shaped my resilience and problem-solving approach.",
    icon: "🎯",
  },
  {
    period: "2018 - 2022",
    title: "Sainik School Kunjpura",
    subtitle: "Secondary Education",
    description: "Foundation years that instilled discipline, leadership qualities, and a structured approach to challenges. Developed strong fundamentals and time management skills.",
    icon: "🏫",
  },
]

export default function AboutPage() {
  const [currentProjects, setCurrentProjects] = useState<NowProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCurrentProjects = async () => {
      const { data } = await supabase
        .from("now_projects")
        .select("*")
        .order("display_order", { ascending: true })
        .limit(3)
      
      setCurrentProjects(data || [])
      setLoading(false)
    }
    fetchCurrentProjects()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="space-y-8 md:space-y-12 mb-16">
        <h1 className="font-mono text-4xl font-bold">About Me</h1>
        <p className="font-mono text-muted-foreground text-lg">
          Backend developer passionate about building scalable systems and exploring AI.
        </p>
      </div>

      {/* Summary Card */}
      <div className="mb-16 md:mb-20">
      <Card>
        <CardHeader>
          <CardTitle className="font-mono">Background</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-mono text-sm leading-relaxed">
            I'm a backend-focused engineering student with a passion for building robust, scalable systems. My journey
            spans from club leadership to ML research, with hands-on experience in EEG signal processing and real-world
            data analysis.
          </p>
          <p className="font-mono text-sm leading-relaxed">
            When I'm not coding, you'll find me exploring new technologies, writing technical blogs, or diving deep into
            the intersection of AI and neuroscience.
          </p>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-6 mb-16 md:mb-20">
        <h2 className="font-mono text-2xl font-bold">Journey</h2>
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-primary/30 before:to-transparent md:before:ml-8">
          {timeline.map((item, index) => (
            <div key={index} className="relative flex gap-4 md:gap-6">
              {/* Timeline dot with pulse animation */}
              <div className="relative flex items-start pt-1.5">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border-2 border-primary shadow-lg md:h-16 md:w-16">
                  <span className="text-xl md:text-3xl">{item.icon}</span>
                  {index === 0 && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20 opacity-75"></span>
                  )}
                </div>
              </div>
              
              {/* Content card */}
              <div className="flex-1 pb-8">
                <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] duration-300">
                  <CardHeader className="space-y-1 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="font-mono text-xs">
                        {item.period}
                      </Badge>
                      {index === 0 && (
                        <Badge variant="default" className="font-mono text-xs animate-pulse">
                          Current
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="font-mono text-lg md:text-xl">{item.title}</CardTitle>
                    <CardDescription className="font-mono text-sm font-semibold text-primary/80">
                      {item.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-6 mb-16 md:mb-20">
        <h2 className="font-mono text-2xl font-bold">Skills</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="font-mono text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="font-mono text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Activity Heatmap
      <div className="space-y-6">
        <h2 className="font-mono text-2xl font-bold">Activity</h2>
        <ActivityHeatmap title="Learning & Building Days" />
      </div> */}

      {/* NOW Page Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono">Currently Working On</CardTitle>
          <CardDescription className="font-mono">What I'm focused on right now</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="font-mono text-sm text-muted-foreground">Loading current projects...</div>
          ) : currentProjects.length > 0 ? (
            <div className="font-mono text-sm space-y-3">
              {currentProjects.map((project) => (
                <div key={project.id} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <div className="flex-1">
                    <span className="font-semibold">{project.name}</span>
                    {project.progress > 0 && (
                      <span className="text-muted-foreground ml-2">({project.progress}%)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="font-mono text-sm space-y-2">
              <p>• Building scalable backend systems</p>
              <p>• Exploring AI and ML applications</p>
              <p>• Contributing to open source projects</p>
            </div>
          )}
          <Button asChild variant="outline" className="font-mono">
            <Link href="/now">View Full NOW Page →</Link>
          </Button>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}