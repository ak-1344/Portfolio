import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { ActivityHeatmap } from "@/components/activity-heatmap"

const skills = {
  Backend: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
  Frontend: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  DevOps: ["Docker", "Linux", "Proxmox", "AWS", "CI/CD"],
  ML: ["Pandas", "scikit-learn", "EEG Processing", "TensorFlow"],
}

const timeline = [
  {
    year: "2024",
    title: "ML Research Intern",
    description: "EEG signal processing and machine learning research",
  },
  {
    year: "2023",
    title: "Club Leadership",
    description: "Led technical initiatives and mentored junior developers",
  },
  {
    year: "2022",
    title: "Backend Development",
    description: "Started focusing on scalable system architecture",
  },
  {
    year: "2021",
    title: "Started Journey",
    description: "Began exploring computer science and programming",
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="font-mono text-4xl font-bold">About Me</h1>
        <p className="font-mono text-muted-foreground text-lg">
          Backend developer passionate about building scalable systems and exploring AI.
        </p>
      </div>

      {/* Summary Card */}
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
      <div className="space-y-6">
        <h2 className="font-mono text-2xl font-bold">Journey</h2>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex gap-4 border-l-2 border-primary/20 pl-4 pb-4">
              <div className="flex-shrink-0">
                <div className="w-3 h-3 bg-primary rounded-full -ml-6 mt-2"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {item.year}
                  </Badge>
                  <h3 className="font-mono font-semibold">{item.title}</h3>
                </div>
                <p className="font-mono text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-6">
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
          <div className="font-mono text-sm space-y-2">
            <p>• EEG ML project for signal classification</p>
            <p>• Nexus Club website development</p>
            <p>• Backend system architecture research</p>
          </div>
          <Button asChild variant="outline" className="font-mono">
            <Link href="/now">View Full NOW Page →</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}