"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Lock, Plus, Edit, Trash2, Save } from "lucide-react"
import { mediaItems } from "@/lib/media-data"
import Image from "next/image"
import Link from "next/link"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication check (in real app, use proper auth)
    if (credentials.email === "admin@ak.dev" && credentials.password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-mono text-2xl">Admin Access</CardTitle>
            <CardDescription className="font-mono">Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                  className="font-mono"
                  placeholder="admin@ak.dev"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  className="font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full font-mono">
                Access Admin Panel
              </Button>
            </form>
            <p className="text-xs text-muted-foreground font-mono mt-4 text-center">Demo: admin@ak.dev / admin123</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-4xl font-bold">Admin Panel</h1>
          <p className="font-mono text-muted-foreground">Manage your portfolio content</p>
        </div>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)} className="font-mono">
          Logout
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="font-mono">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="blogs" className="font-mono">
            Blogs
          </TabsTrigger>
          <TabsTrigger value="projects" className="font-mono">
            Projects
          </TabsTrigger>
          <TabsTrigger value="media" className="font-mono">
            Media
          </TabsTrigger>
          <TabsTrigger value="now" className="font-mono">
            NOW Page
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono">Total Blogs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono font-bold">3</div>
                <p className="text-sm text-muted-foreground font-mono">Published posts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-mono">Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono font-bold">4</div>
                <p className="text-sm text-muted-foreground font-mono">Active projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-mono">Last Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-mono font-bold">2 days ago</div>
                <p className="text-sm text-muted-foreground font-mono">NOW page</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between items-center">
                  <span>Published "Building Scalable APIs with Node.js"</span>
                  <Badge variant="outline">Blog</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Updated EEG ML Classifier project</span>
                  <Badge variant="outline">Project</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Modified NOW page content</span>
                  <Badge variant="outline">Page</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blogs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-mono text-2xl font-bold">Manage Blogs</h2>
            <Button asChild className="font-mono">
              <Link href="/admin/create-blog">
                <Plus className="h-4 w-4 mr-2" />
                New Blog Post
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { title: "Building Scalable APIs with Node.js", status: "Published", date: "2024-01-15" },
              { title: "EEG Signal Processing with Python", status: "Published", date: "2024-01-10" },
              { title: "Streamlining Development with Docker", status: "Draft", date: "2024-01-05" },
            ].map((blog, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="space-y-1">
                    <h3 className="font-mono font-semibold">{blog.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                      <span>{blog.date}</span>
                      <Badge variant={blog.status === "Published" ? "default" : "secondary"}>{blog.status}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="font-mono">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="font-mono">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-mono text-2xl font-bold">Manage Projects</h2>
            <Button asChild className="font-mono">
              <Link href="/admin/create-project">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { title: "EEG Signal Classifier", category: "ML", status: "Active" },
              { title: "Nexus Club Platform", category: "Backend", status: "Active" },
              { title: "Data Pipeline Automation", category: "Backend", status: "Completed" },
              { title: "Developer Portfolio", category: "Personal", status: "Active" },
            ].map((project, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="space-y-1">
                    <h3 className="font-mono font-semibold">{project.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                      <Badge variant="outline">{project.category}</Badge>
                      <Badge variant={project.status === "Active" ? "default" : "secondary"}>{project.status}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="font-mono">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="font-mono">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-mono text-2xl font-bold">Media Manager</h2>
            <Button className="font-mono">
              <Plus className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaItems.slice(0, 6).map((item) => (
              <Card key={item.id}>
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    src={item.url || "/placeholder.svg"}
                    alt={item.caption || item.filename}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-mono font-semibold text-sm truncate">{item.filename}</h3>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="font-mono text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      Used in {item.usedIn.length} place{item.usedIn.length !== 1 ? "s" : ""}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="font-mono flex-1">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="font-mono flex-1">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Upload New Media</CardTitle>
              <CardDescription className="font-mono">Add images, screenshots, or other media files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <div className="font-mono text-muted-foreground mb-4">Drag and drop files here, or click to browse</div>
                <Button variant="outline" className="font-mono">
                  Choose Files
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-mono">Caption</Label>
                  <Input className="font-mono" placeholder="Brief description..." />
                </div>
                <div className="space-y-2">
                  <Label className="font-mono">Tags</Label>
                  <Input className="font-mono" placeholder="project, blog, ui..." />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-mono">Usage Context</Label>
                <Textarea className="font-mono" placeholder="Where will this be used?" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="now" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-mono text-2xl font-bold">Edit NOW Page</h2>
            <Button className="font-mono">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Current Content</CardTitle>
              <CardDescription className="font-mono">Update what you're currently working on</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="now-content" className="font-mono">
                  Content
                </Label>
                <Textarea
                  id="now-content"
                  className="font-mono min-h-[200px]"
                  defaultValue={`Current Projects:
• EEG ML Classification Project - Building a machine learning model to classify EEG signals with high accuracy
• Nexus Club Website - Full-stack platform for club management and member engagement
• Backend Architecture Research - Researching scalable system architectures for high-traffic applications

Currently Learning:
• Advanced EEG signal processing techniques
• Kubernetes orchestration and deployment
• System design patterns for microservices
• Real-time data streaming with Apache Kafka`}
                />
              </div>
              <div className="text-sm text-muted-foreground font-mono">Last updated: January 15, 2024</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
