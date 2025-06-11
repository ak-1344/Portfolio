import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Target } from "lucide-react"

const currentProjects = [
  {
    title: "EEG ML Classification Project",
    description: "Building a machine learning model to classify EEG signals with high accuracy",
    status: "In Progress",
    progress: 75,
    timeline: "Expected completion: March 2024",
  },
  {
    title: "Nexus Club Website",
    description: "Full-stack platform for club management and member engagement",
    status: "Development",
    progress: 60,
    timeline: "Beta launch: February 2024",
  },
  {
    title: "Backend Architecture Research",
    description: "Researching scalable system architectures for high-traffic applications",
    status: "Research",
    progress: 40,
    timeline: "Ongoing study",
  },
]

const currentLearning = [
  "Advanced EEG signal processing techniques",
  "Kubernetes orchestration and deployment",
  "System design patterns for microservices",
  "Real-time data streaming with Apache Kafka",
]

const recentReads = [
  "Designing Data-Intensive Applications by Martin Kleppmann",
  "Clean Architecture by Robert C. Martin",
  "The Pragmatic Programmer by David Thomas",
]

export default function NowPage() {
  const lastUpdated = "January 15, 2024"

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
      <div className="space-y-4">
        <h1 className="font-mono text-4xl font-bold">NOW</h1>
        <p className="font-mono text-muted-foreground text-lg">What I'm currently focused on and working towards.</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
          <Clock className="h-4 w-4" />
          Last updated: {lastUpdated}
        </div>
      </div>

      {/* Current Projects */}
      <div className="space-y-6">
        <h2 className="font-mono text-2xl font-bold flex items-center gap-2">
          <Target className="h-6 w-6" />
          Current Projects
        </h2>
        <div className="space-y-4">
          {currentProjects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-mono text-lg">{project.title}</CardTitle>
                  <Badge variant="outline" className="font-mono text-xs">
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="font-mono">{project.description}</CardDescription>
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
                <p className="font-mono text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {project.timeline}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Currently Learning */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-xl">Currently Learning</CardTitle>
          <CardDescription className="font-mono">Technologies and concepts I'm diving deep into</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 font-mono text-sm">
            {currentLearning.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recent Reads */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-xl">Recent Reads</CardTitle>
          <CardDescription className="font-mono">Books that are shaping my thinking</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 font-mono text-sm">
            {recentReads.map((book, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">📖</span>
                {book}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Philosophy */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-xl">Current Philosophy</CardTitle>
        </CardHeader>
        <CardContent className="font-mono text-sm leading-relaxed space-y-4">
          <p>
            I believe in building systems that solve real problems. Every line of code should serve a purpose, and every
            system should be designed with scalability and maintainability in mind.
          </p>
          <p>
            Currently focused on the intersection of AI and practical applications, particularly in signal processing
            and data analysis. The goal is to bridge the gap between research and real-world implementation.
          </p>
          <p>
            Learning never stops. Every project teaches something new, every bug reveals a deeper understanding, and
            every challenge is an opportunity to grow.
          </p>
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
