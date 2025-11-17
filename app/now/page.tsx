"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Target } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import type { NowProject, NowMeta } from "@/types"
import { formatDate } from "@/lib/helpers"

export default function NowPage() {
  const [currentProjects, setCurrentProjects] = useState<NowProject[]>([])
  const [nowMeta, setNowMeta] = useState<NowMeta | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNowData = async () => {
      setLoading(true)
      
      // Fetch current projects with display_order
      const { data: projectsData, error: projectsError } = await supabase
        .from("now_projects")
        .select("*")
        .order("display_order", { ascending: true })
        .order("updated_at", { ascending: false })
      
      // Fetch now meta data
      const { data: metaData, error: metaError } = await supabase
        .from("now_meta")
        .select("*")
        .single()

      if (projectsError) console.error("Error fetching now projects:", projectsError)
      else setCurrentProjects(projectsData || [])
      
      if (metaError) console.error("Error fetching now meta:", metaError)
      else setNowMeta(metaData)
      
      setLoading(false)
    }

    fetchNowData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center py-12">
          <p className="font-mono text-muted-foreground">Loading current activities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl space-y-8 md:space-y-12">
      <div className="space-y-4">
        <h1 className="font-mono text-3xl md:text-4xl font-bold">NOW</h1>
        <p className="font-mono text-muted-foreground text-base md:text-lg">What I'm currently focused on and working towards.</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
          <Clock className="h-4 w-4" />
          Last updated: {nowMeta?.updated_at ? formatDate(nowMeta.updated_at) : 'Recently'}
        </div>
      </div>

      {/* Current Projects */}
      <div className="space-y-6">
        <h2 className="font-mono text-2xl font-bold flex items-center gap-2">
          <Target className="h-6 w-6" />
          Current Projects
        </h2>
        {currentProjects.length === 0 ? (
          <p className="font-mono text-muted-foreground">No current projects to display.</p>
        ) : (
          <div className="space-y-4">
            {currentProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-lg">{project.name}</CardTitle>
                    <Badge variant="outline" className="font-mono text-xs">
                      {project.tag}
                    </Badge>
                  </div>
                  <CardDescription className="font-mono preserve-whitespace">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-mono">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  {project.comments && (
                    <p className="font-mono text-sm text-muted-foreground flex items-center gap-2 preserve-whitespace">
                      <Calendar className="h-4 w-4" />
                      {project.comments}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Currently Learning */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-xl">Currently Learning</CardTitle>
          <CardDescription className="font-mono">Technologies and concepts I'm diving deep into</CardDescription>
        </CardHeader>
        <CardContent>
          {nowMeta?.currently_learning ? (
            <div className="font-mono text-sm preserve-whitespace leading-relaxed">
              {nowMeta.currently_learning}
            </div>
          ) : (
            <p className="font-mono text-sm text-muted-foreground">No learning items available</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Reads */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-xl">Recent Reads</CardTitle>
          <CardDescription className="font-mono">Books that are shaping my thinking</CardDescription>
        </CardHeader>
        <CardContent>
          {nowMeta?.recent_reads ? (
            <div className="font-mono text-sm preserve-whitespace leading-relaxed">
              {nowMeta.recent_reads}
            </div>
          ) : (
            <p className="font-mono text-sm text-muted-foreground">No recent reads available</p>
          )}
        </CardContent>
      </Card>

      {/* Philosophy */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-xl">Current Philosophy</CardTitle>
        </CardHeader>
        <CardContent className="font-mono text-sm leading-relaxed space-y-4">
          {nowMeta?.current_philosophy ? (
            <div className="preserve-whitespace">
              {nowMeta.current_philosophy}
            </div>
          ) : (
            <div>
              <p>
                I believe in building systems that solve real problems. Every line of code should serve a purpose, and every
                system should be designed with scalability and maintainability in mind.
              </p>
              <p className="mt-4">
                Currently focused on the intersection of AI and practical applications, particularly in signal processing
                and data analysis. The goal is to bridge the gap between research and real-world implementation.
              </p>
              <p className="mt-4">
                Learning never stops. Every project teaches something new, every bug reveals a deeper understanding, and
                every challenge is an opportunity to grow.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center font-mono text-sm text-muted-foreground">
        <p>This page is updated regularly to reflect my current focus and priorities.</p>
        <p className="mt-2">
          Want to collaborate on something?{" "}
          <a href="/contact" className="text-primary hover:underline">
            Let's talk
          </a>
          .
        </p>
      </div>
    </div>
  )
}