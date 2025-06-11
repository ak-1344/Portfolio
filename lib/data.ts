export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: string
  github?: string
  demo?: string
  image: string
  challenges?: string
  learnings?: string
  timeline?: string
}

export interface BlogPost {
  id: string
  title: string
  summary: string
  content: string
  date: string
  tags: string[]
  coverImage: string
  readTime: number
}

export const projects: Project[] = [
  {
    id: "eeg-ml-classifier",
    title: "EEG Signal Classifier",
    description: "Machine learning model for classifying EEG signals with 94% accuracy",
    longDescription:
      "A comprehensive machine learning pipeline for processing and classifying EEG signals. The project involves signal preprocessing, feature extraction, and deep learning model training to achieve high accuracy in brain signal classification.",
    tech: ["Python", "TensorFlow", "Pandas", "NumPy", "scikit-learn"],
    category: "ML",
    github: "https://github.com",
    image: "/placeholder.svg?height=300&width=400",
    challenges: "Dealing with noisy EEG data and finding optimal preprocessing techniques",
    learnings: "Deep understanding of signal processing and neural network architectures",
    timeline: "3 months",
  },
  {
    id: "nexus-club-platform",
    title: "Nexus Club Platform",
    description: "Full-stack web platform for club management and member engagement",
    longDescription:
      "A comprehensive platform built for managing club activities, member registration, event scheduling, and community engagement. Features include real-time notifications, payment integration, and analytics dashboard.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Docker", "AWS"],
    category: "Backend",
    github: "https://github.com",
    demo: "https://nexus-club.com",
    image: "/placeholder.svg?height=300&width=400",
    challenges: "Scaling to handle concurrent users and implementing real-time features",
    learnings: "System architecture design and database optimization",
    timeline: "6 months",
  },
  {
    id: "data-pipeline-automation",
    title: "Data Pipeline Automation",
    description: "Automated ETL pipeline for processing large-scale datasets",
    longDescription:
      "Built a robust ETL pipeline that processes terabytes of data daily. Includes data validation, transformation, and loading into multiple data warehouses with monitoring and alerting systems.",
    tech: ["Python", "Apache Airflow", "PostgreSQL", "Redis", "Docker"],
    category: "Backend",
    github: "https://github.com",
    image: "/placeholder.svg?height=300&width=400",
    challenges: "Handling data inconsistencies and ensuring pipeline reliability",
    learnings: "Data engineering best practices and system monitoring",
    timeline: "4 months",
  },
  {
    id: "personal-portfolio",
    title: "Developer Portfolio",
    description: "Modern, responsive portfolio website with admin panel",
    longDescription:
      "A sleek, minimalistic portfolio website built with modern web technologies. Features include dark/light mode, admin panel for content management, and optimized performance.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    category: "Personal",
    github: "https://github.com",
    demo: "https://ak-dev.com",
    image: "/placeholder.svg?height=300&width=400",
    challenges: "Creating a unique design that stands out while maintaining usability",
    learnings: "Modern web development practices and UI/UX design principles",
    timeline: "2 months",
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: "building-scalable-apis",
    title: "Building Scalable APIs with Node.js",
    summary: "Best practices for designing and implementing scalable REST APIs that can handle millions of requests.",
    content: `# Building Scalable APIs with Node.js

When building APIs that need to handle high traffic, there are several key principles to follow...

## Architecture Patterns

### 1. Microservices Architecture
Breaking down your application into smaller, independent services allows for better scalability and maintainability.

### 2. Database Optimization
- Use connection pooling
- Implement proper indexing
- Consider read replicas for heavy read workloads

## Code Example

\`\`\`javascript
const express = require('express');
const app = express();

// Middleware for rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
\`\`\`

## Conclusion

Building scalable APIs requires careful planning and implementation of proven patterns...`,
    date: "2024-01-15",
    tags: ["Node.js", "API", "Backend", "Scalability"],
    coverImage: "/placeholder.svg?height=200&width=400",
    readTime: 8,
  },
  {
    id: "eeg-signal-processing",
    title: "EEG Signal Processing with Python",
    summary:
      "A deep dive into processing EEG signals for machine learning applications using Python and scientific libraries.",
    content: `# EEG Signal Processing with Python

EEG (Electroencephalography) signals contain valuable information about brain activity...

## Preprocessing Steps

### 1. Filtering
Remove noise and artifacts from the raw EEG data.

### 2. Feature Extraction
Extract meaningful features that can be used for classification.

## Implementation

\`\`\`python
import numpy as np
from scipy import signal
import pandas as pd

def preprocess_eeg(data, sampling_rate=256):
    # Apply bandpass filter
    nyquist = sampling_rate / 2
    low = 1 / nyquist
    high = 50 / nyquist
    b, a = signal.butter(4, [low, high], btype='band')
    filtered_data = signal.filtfilt(b, a, data)
    return filtered_data
\`\`\`

## Results

Our preprocessing pipeline achieved 94% accuracy in signal classification...`,
    date: "2024-01-10",
    tags: ["Python", "EEG", "Machine Learning", "Signal Processing"],
    coverImage: "/placeholder.svg?height=200&width=400",
    readTime: 12,
  },
  {
    id: "docker-development-workflow",
    title: "Streamlining Development with Docker",
    summary: "How to use Docker to create consistent development environments and improve team productivity.",
    content: `# Streamlining Development with Docker

Docker has revolutionized how we approach development environments...

## Benefits of Docker

- Consistent environments across team members
- Easy dependency management
- Simplified deployment process

## Docker Compose Setup

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
  
  database:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
\`\`\`

## Best Practices

1. Use multi-stage builds for production
2. Minimize image size
3. Use .dockerignore files
4. Don't run as root user

Docker has significantly improved our development workflow...`,
    date: "2024-01-05",
    tags: ["Docker", "DevOps", "Development", "Containers"],
    coverImage: "/placeholder.svg?height=200&width=400",
    readTime: 6,
  },
]
