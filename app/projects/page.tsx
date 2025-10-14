"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ActivityHeatmap } from "@/components/activity-heatmap"
import { Github, ExternalLink } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

type Project = {
  id: string
  name: string
  description: string
  tags: string[]
  codebase_link: string
  deployment_link: string
  cover_image: string
  category?: string
}

const categories = ["All", "Backend", "ML", "Club", "Personal"]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
      if (error) console.error(error)
      else setProjects(data || [])
      setLoading(false)
    }

    fetchProjects()
  }, [])

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="font-mono text-4xl font-bold">Projects</h1>
        <p className="font-mono text-muted-foreground text-lg">Things I've built and learned from.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="font-mono"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <p className="text-center mt-6 font-mono">Loading projects...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-shadow">
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
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.tags?.map((tech) => (
                    <Badge key={tech} variant="secondary" className="font-mono text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.codebase_link && (
                    <Button size="sm" variant="outline" asChild className="font-mono">
                      <a href={project.codebase_link} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.deployment_link && (
                    <Button size="sm" variant="outline" asChild className="font-mono">
                      <a href={project.deployment_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Demo
                      </a>
                    </Button>
                  )}
                  <Button size="sm" asChild className="font-mono">
                    <Link href={`/projects/${project.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Activity Heatmap */}
      {/* <div className="space-y-6">
        <h2 className="font-mono text-2xl font-bold">Project Activity</h2>
        <ActivityHeatmap title="Active Development Days" />
      </div> */}
    </div>
  )
}
