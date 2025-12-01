"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Github, ExternalLink, Pin, Search, X } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import type { Project } from "@/types"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [pinnedProjects, setPinnedProjects] = useState<Project[]>([])
  const [regularProjects, setRegularProjects] = useState<Project[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [allTags, setAllTags] = useState<string[]>([])
  const [topTags, setTopTags] = useState<Array<{ tag: string; count: number }>>([])
  const [searchQuery, setSearchQuery] = useState("")
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

      // Extract all unique tags and count occurrences
      const tagsMap = new Map<string, number>()
      allProjects.forEach((project) => {
        if (project.tags && Array.isArray(project.tags)) {
          project.tags.forEach((tag: string) => {
            tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1)
          })
        }
      })
      
      const allUniqueTags = Array.from(tagsMap.keys()).sort()
      setAllTags(allUniqueTags)
      
      // Get top 3 most used tags
      const sortedTags = Array.from(tagsMap.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
      setTopTags(sortedTags)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  // Apply search filter
  const searchFilteredPinned = searchQuery
    ? pinnedProjects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : pinnedProjects

  const searchFilteredRegular = searchQuery
    ? regularProjects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : regularProjects

  // Apply tag filter
  const tagFilteredProjects = selectedTag
    ? projects.filter((project) => project.tags && project.tags.includes(selectedTag))
    : [...searchFilteredPinned, ...searchFilteredRegular]

  // When tag is selected, ignore pinned section but maintain display order
  const displayedProjects = selectedTag
    ? tagFilteredProjects.sort((a, b) => a.display_order - b.display_order)
    : null

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null)
    } else {
      setSelectedTag(tag)
      setSearchQuery("") // Clear search when selecting a tag
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value) {
      setSelectedTag(null) // Clear tag filter when searching
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="space-y-8 md:space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-mono text-3xl md:text-4xl font-bold">Projects</h1>
          <p className="font-mono text-muted-foreground text-base md:text-lg">Things I've built and learned from.</p>
        </div>

        {/* Search Bar and Tags Container */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 pr-12 py-6 font-mono text-sm rounded-full border-2 focus-visible:ring-offset-0 transition-all duration-200"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full hover:bg-muted"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Top 3 Tags */}
          {topTags.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                {/* <span className="font-mono text-sm text-muted-foreground">Popular tags:</span> */}
                {selectedTag && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTag(null)}
                    className="font-mono text-xs h-7"
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {topTags.map(({ tag, count }) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className="font-mono text-xs cursor-pointer hover:bg-primary/90 transition-colors px-3 py-1.5"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag} ({count})
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="space-y-4">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        </div>
      ) : selectedTag ? (
        // Tag-filtered view (no pinned section)
        <div className="space-y-6">
          <div className="text-center">
            <p className="font-mono text-sm text-muted-foreground">
              Showing projects with tag: <span className="font-bold text-foreground">{selectedTag}</span>
            </p>
          </div>
          {displayedProjects && displayedProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} isPinned={false} onTagClick={handleTagClick} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-text">No projects found with this tag.</p>
            </div>
          )}
        </div>
      ) : (
        // Normal view with pinned and regular sections
        <div className="space-y-16">
          {/* Pinned Projects Section */}
          {searchFilteredPinned.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Pin className="h-6 w-6 text-yellow-600" />
                <h2 className="font-mono text-2xl font-bold">Pinned Projects</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchFilteredPinned.map((project) => (
                  <ProjectCard key={project.id} project={project} isPinned={true} onTagClick={handleTagClick} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Projects Section */}
          {searchFilteredRegular.length > 0 && (
            <div className="space-y-6">
              {searchFilteredPinned.length > 0 && (
                <h2 className="font-mono text-2xl font-bold">All Projects</h2>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchFilteredRegular.map((project) => (
                  <ProjectCard key={project.id} project={project} isPinned={false} onTagClick={handleTagClick} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {searchFilteredPinned.length === 0 && searchFilteredRegular.length === 0 && (
            <div className="empty-state">
              <p className="empty-state-text">{searchQuery ? "No projects found matching your search." : "No projects found."}</p>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project, isPinned, onTagClick }: { project: Project; isPinned: boolean; onTagClick?: (tag: string) => void }) {
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
            <Badge 
              key={tech} 
              variant="secondary" 
              className="font-mono text-xs cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                onTagClick?.(tech)
              }}
            >
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
