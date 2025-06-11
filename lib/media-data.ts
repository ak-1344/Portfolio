export interface MediaItem {
  id: string
  filename: string
  url: string
  caption?: string
  description: string
  usedIn: {
    type: "blog" | "project" | "now" | "profile" | "ui"
    id?: string
    title: string
  }[]
  tags: string[]
  uploadDate: string
  size: number
  dimensions?: {
    width: number
    height: number
  }
}

export const mediaItems: MediaItem[] = [
  {
    id: "profile-main",
    filename: "ak-profile.jpg",
    url: "/placeholder.svg?height=320&width=320",
    caption: "Main profile photo",
    description: "Professional headshot used across the portfolio",
    usedIn: [
      { type: "profile", title: "Homepage Hero Section" },
      { type: "ui", title: "Navigation Avatar" },
    ],
    tags: ["profile", "headshot", "main"],
    uploadDate: "2024-01-01",
    size: 245760,
    dimensions: { width: 320, height: 320 },
  },
  {
    id: "eeg-project-demo",
    filename: "eeg-classifier-demo.png",
    url: "/placeholder.svg?height=400&width=600",
    caption: "EEG Signal Classification Dashboard",
    description: "Screenshot of the ML model interface showing real-time EEG signal classification",
    usedIn: [
      { type: "project", id: "eeg-ml-classifier", title: "EEG Signal Classifier" },
      { type: "blog", id: "eeg-signal-processing", title: "EEG Signal Processing with Python" },
    ],
    tags: ["project", "ml", "eeg", "dashboard"],
    uploadDate: "2024-01-10",
    size: 892160,
    dimensions: { width: 600, height: 400 },
  },
  {
    id: "nexus-platform-ui",
    filename: "nexus-club-interface.png",
    url: "/placeholder.svg?height=400&width=600",
    caption: "Nexus Club Platform Interface",
    description: "Main dashboard of the club management platform showing member analytics",
    usedIn: [{ type: "project", id: "nexus-club-platform", title: "Nexus Club Platform" }],
    tags: ["project", "backend", "dashboard", "ui"],
    uploadDate: "2024-01-08",
    size: 756432,
    dimensions: { width: 600, height: 400 },
  },
  {
    id: "coding-setup",
    filename: "dev-workspace.jpg",
    url: "/placeholder.svg?height=400&width=600",
    caption: "Development Workspace",
    description: "My coding setup with multiple monitors showing various development tools",
    usedIn: [
      { type: "blog", id: "docker-development-workflow", title: "Streamlining Development with Docker" },
      { type: "ui", title: "About Page Background" },
    ],
    tags: ["workspace", "coding", "setup", "background"],
    uploadDate: "2024-01-05",
    size: 1024000,
    dimensions: { width: 600, height: 400 },
  },
  {
    id: "api-architecture",
    filename: "scalable-api-diagram.png",
    url: "/placeholder.svg?height=300&width=500",
    caption: "Scalable API Architecture Diagram",
    description: "System architecture diagram showing microservices and API gateway design",
    usedIn: [{ type: "blog", id: "building-scalable-apis", title: "Building Scalable APIs with Node.js" }],
    tags: ["blog", "architecture", "api", "diagram"],
    uploadDate: "2024-01-15",
    size: 432100,
    dimensions: { width: 500, height: 300 },
  },
  {
    id: "terminal-screenshot",
    filename: "terminal-commands.png",
    url: "/placeholder.svg?height=300&width=500",
    caption: "Terminal Commands in Action",
    description: "Screenshot of terminal showing Docker commands and deployment scripts",
    usedIn: [
      { type: "blog", id: "docker-development-workflow", title: "Streamlining Development with Docker" },
      { type: "ui", title: "404 Page Background" },
    ],
    tags: ["terminal", "docker", "commands", "development"],
    uploadDate: "2024-01-06",
    size: 298765,
    dimensions: { width: 500, height: 300 },
  },
]

export function getMediaByUsage(type: string, id?: string) {
  return mediaItems.filter((item) => item.usedIn.some((usage) => usage.type === type && (id ? usage.id === id : true)))
}

export function getMediaByTags(tags: string[]) {
  return mediaItems.filter((item) => tags.some((tag) => item.tags.includes(tag)))
}
