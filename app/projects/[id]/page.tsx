import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/data"
import { Github, ExternalLink, ArrowLeft, Clock, Target, Lightbulb } from "lucide-react"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="font-mono">
        <Link href="/projects">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
      </Button>

      {/* Project Header */}
      <div className="space-y-6">
        <div className="aspect-video overflow-hidden rounded-lg border">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="font-mono text-4xl font-bold">{project.title}</h1>
          <p className="font-mono text-lg text-muted-foreground">{project.longDescription}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary" className="font-mono">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4">
            {project.github && (
              <Button asChild className="font-mono">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            {project.demo && (
              <Button variant="outline" asChild className="font-mono">
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="grid md:grid-cols-3 gap-6">
        {project.timeline && (
          <Card>
            <CardHeader>
              <CardTitle className="font-mono flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-mono text-sm">{project.timeline}</p>
            </CardContent>
          </Card>
        )}

        {project.challenges && (
          <Card>
            <CardHeader>
              <CardTitle className="font-mono flex items-center gap-2">
                <Target className="h-5 w-5" />
                Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-mono text-sm">{project.challenges}</p>
            </CardContent>
          </Card>
        )}

        {project.learnings && (
          <Card>
            <CardHeader>
              <CardTitle className="font-mono flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Learnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-mono text-sm">{project.learnings}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Related Projects */}
      <div className="space-y-6">
        <h2 className="font-mono text-2xl font-bold">Related Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects
            .filter((p) => p.id !== project.id && p.category === project.category)
            .slice(0, 3)
            .map((relatedProject) => (
              <Card key={relatedProject.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-mono text-lg">{relatedProject.title}</CardTitle>
                  <CardDescription className="font-mono text-sm">{relatedProject.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" asChild className="font-mono">
                    <Link href={`/projects/${relatedProject.id}`}>View Project</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
