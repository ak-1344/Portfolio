"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Pin } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import type { Project } from "@/types"

const categories = ["All", "Backend", "ML", "Club", "Personal"]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [pinnedProjects, setPinnedProjects] = useState<Project[]>([])
  const [regularProjects, setRegularProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("pin_order", { ascending: true, nullsFirst: false })
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false })

      if (error) throw error

      const allProjects = data || []
      setProjects(allProjects)

      // Separate pinned and regular projects
      const pinned = allProjects.filter((p) => p.is_pinned)
      const regular = allProjects.filter((p) => !p.is_pinned)

      setPinnedProjects(pinned)
      setRegularProjects(regular)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPinnedProjects =
    selectedCategory === "All"
      ? pinnedProjects
      : pinnedProjects.filter((project) => project.category === selectedCategory)

  const filteredRegularProjects =
    selectedCategory === "All"
      ? regularProjects
      : regularProjects.filter((project) => project.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="space-y-8 md:space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-mono text-3xl md:text-4xl font-bold">Projects</h1>
          <p className="font-mono text-muted-foreground text-base md:text-lg">Things I've built and learned from.</p>
        </div>

        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
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

      {loading ? (
        <div className="text-center py-12">
          <div className="space-y-4">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Pinned Projects Section */}
          {filteredPinnedProjects.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Pin className="h-6 w-6 text-yellow-600" />
                <h2 className="font-mono text-2xl font-bold">Pinned Projects</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPinnedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} isPinned={true} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Projects Section */}
          {filteredRegularProjects.length > 0 && (
            <div className="space-y-6">
              {filteredPinnedProjects.length > 0 && (
                <h2 className="font-mono text-2xl font-bold">All Projects</h2>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRegularProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} isPinned={false} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredPinnedProjects.length === 0 && filteredRegularProjects.length === 0 && (
            <div className="empty-state">
              <p className="empty-state-text">No projects found in this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Project Card Component
function ProjectCard({ project, isPinned }: { project: Project; isPinned: boolean }) {
  return (
    <Card className={`group hover:shadow-lg transition-shadow ${isPinned ? "card-pinned" : ""}`}>
      {/* Pin Badge */}
      {isPinned && (
        <div className="absolute top-4 right-4 z-10">
          <span className="pin-badge">
            📌 #{project.pin_order}
          </span>
        </div>
      )}

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
        <CardDescription className="font-mono text-sm preserve-whitespace line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {project.tags?.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="font-mono text-xs">
              {tech}
            </Badge>
          ))}
          {project.tags && project.tags.length > 3 && (
            <Badge variant="outline" className="font-mono text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
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
  )
}
