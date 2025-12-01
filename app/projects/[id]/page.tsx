"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, ArrowLeft, Clock, Target, Lightbulb, Pin } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import type { Project } from "@/types"

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true)
      setError(false)
      try {
        // Fetch main project
        const { data: projectData, error: projectError } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single()

        if (projectError) {
          console.error("Error fetching project:", projectError)
          setError(true)
          setLoading(false)
          return
        }

        if (!projectData) {
          console.error("No project data found for id:", id)
          setError(true)
          setLoading(false)
          return
        }

        console.log("Project data fetched successfully:", projectData)
        setProject(projectData)

        // Fetch related projects
        if (projectData.category) {
          const { data: relatedData } = await supabase
            .from("projects")
            .select("*")
            .neq("id", id)
            .eq("category", projectData.category)
            .limit(3)

          if (relatedData) {
            setRelatedProjects(relatedData)
          }
        }
      } catch (error) {
        console.error("Error fetching project:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectData()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="skeleton-card h-96" />
      </div>
    )
  }

  if (error || !project) {
    return notFound()
  }

  // Use detailed_description if available, fallback to description
  const fullDescription = project.detailed_description || project.description

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="font-mono">
        <Link href="/projects">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
      </Button>

      {/* Pin Badge */}
      {project.is_pinned && (
        <div className="inline-block">
          <span className="pin-badge">
            📌 Featured Project #{project.pin_order}
          </span>
        </div>
      )}

      {/* GitHub-Style Layout */}
      <div className="project-detail-layout">
        {/* Sidebar - Image and Quick Info */}
        <div className="project-detail-sidebar">
          {/* Cover Image */}
          <div className="rounded-lg overflow-hidden border">
            <Image
              src={project.cover_image || "/placeholder.svg"}
              alt={project.name}
              width={300}
              height={200}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-lg">{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Short Description */}
              <p className="font-mono text-sm text-muted-foreground preserve-whitespace">
                {project.description}
              </p>

              {/* Tags */}
              <div>
                <h3 className="font-mono text-sm font-semibold mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-1">
                  {project.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="space-y-2">
                {project.codebase_link && (
                  <Button asChild className="w-full font-mono" variant="outline">
                    <a href={project.codebase_link} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.deployment_link && (
                  <Button asChild className="w-full font-mono">
                    <a href={project.deployment_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="project-detail-content">
          {/* About Section */}
          <div>
            <h2 className="font-mono text-3xl font-bold mb-4">About This Project</h2>
            <div className="prose max-w-none">
              <p className="font-mono text-base leading-relaxed preserve-whitespace text-foreground">
                {fullDescription}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {project.timeline && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono flex items-center gap-2 text-base">
                    <Clock className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm preserve-whitespace text-muted-foreground">
                    {project.timeline}
                  </p>
                </CardContent>
              </Card>
            )}

            {project.challenges && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono flex items-center gap-2 text-base">
                    <Target className="h-5 w-5" />
                    Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm preserve-whitespace text-muted-foreground">
                    {project.challenges}
                  </p>
                </CardContent>
              </Card>
            )}

            {project.learnings && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono flex items-center gap-2 text-base">
                    <Lightbulb className="h-5 w-5" />
                    Key Learnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm preserve-whitespace text-muted-foreground">
                    {project.learnings}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects && relatedProjects.length > 0 && (
        <div className="space-y-6 pt-8 border-t">
          <h2 className="font-mono text-2xl font-bold">Related Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProjects.map((relatedProject) => (
              <Card key={relatedProject.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-mono text-base">{relatedProject.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm text-muted-foreground mb-4 line-clamp-2">
                    {relatedProject.description}
                  </p>
                  <Button size="sm" asChild className="font-mono">
                    <Link href={`/projects/${relatedProject.id}`}>View Project</Link>
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
