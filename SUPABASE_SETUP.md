# Supabase Integration Setup

This document outlines the database schema and setup required for the Portfolio website with Supabase integration.

## Environment Variables
The following environment variables are already configured in `.env`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xlemtgivxsfhyxgpqjdx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Required Database Tables

### 1. `projects` table (Already exists - used by projects page)
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  tags TEXT[], -- Array of strings
  codebase_link VARCHAR,
  deployment_link VARCHAR,
  cover_image VARCHAR,
  category VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. `blogs` table (New - for blogs page)
```sql
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  summary TEXT,
  content TEXT,
  date DATE,
  tags TEXT[], -- Array of strings
  cover_image VARCHAR,
  read_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. `now_projects` table (New - for NOW page)
```sql
CREATE TABLE now_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  tag TEXT,                        -- planned, in progress, development, research, etc.
  progress INT DEFAULT 0,          -- % completion
  comments TEXT,                   -- optional notes
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. `now_meta` table (New - for NOW page content)
```sql
CREATE TABLE now_meta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  currently_learning TEXT,
  recent_reads TEXT,
  current_philosophy TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Row Level Security (RLS) Policies

For security, enable RLS and create appropriate policies:

```sql
-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE now_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE now_meta ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON blogs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON now_projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON now_meta FOR SELECT USING (true);

-- Add write policies for authenticated admin users (optional)
-- CREATE POLICY "Allow admin write access" ON projects FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

## Sample Data

### Projects (if not already populated)
```sql
INSERT INTO projects (name, description, tags, codebase_link, deployment_link, cover_image, category) VALUES
('EEG ML Classifier', 'Machine learning model for classifying EEG signals with 94% accuracy', ARRAY['Python', 'TensorFlow', 'ML'], 'https://github.com/example/eeg-classifier', null, '/placeholder.svg', 'ML'),
('Portfolio Website', 'Modern portfolio website with Supabase integration', ARRAY['Next.js', 'TypeScript', 'Supabase'], 'https://github.com/example/portfolio', 'https://portfolio.com', '/placeholder.svg', 'Personal');
```

### Blogs
```sql
INSERT INTO blogs (title, summary, content, date, tags, cover_image, read_time) VALUES
('Building Scalable APIs with Node.js', 'Best practices for designing and implementing scalable REST APIs that can handle millions of requests.', '# Building Scalable APIs with Node.js

When building APIs that need to handle high traffic, there are several key principles to follow...

## Architecture Patterns

### 1. Microservices Architecture
Breaking down your application into smaller, independent services allows for better scalability and maintainability.

### 2. Database Optimization
- Use connection pooling
- Implement proper indexing
- Consider read replicas for heavy read workloads

## Conclusion
Building scalable APIs requires careful planning and implementation of proven patterns...', '2024-01-15', ARRAY['Node.js', 'API', 'Backend', 'Scalability'], '/placeholder.svg', 8);
```

### NOW Projects
```sql
INSERT INTO now_projects (name, description, tag, progress, comments) VALUES
('EEG ML Classification Project', 'Building a machine learning model to classify EEG signals with high accuracy', 'in progress', 75, 'Expected completion: March 2024'),
('Portfolio Enhancement', 'Adding new features and Supabase integration', 'development', 90, 'Beta launch: February 2024'),
('Backend Architecture Research', 'Researching scalable system architectures for high-traffic applications', 'research', 40, 'Ongoing study');
```

### NOW Meta Data
```sql
INSERT INTO now_meta (currently_learning, recent_reads, current_philosophy) VALUES
(
  'Advanced EEG signal processing techniques
Kubernetes orchestration and deployment
System design patterns for microservices
Real-time data streaming with Apache Kafka',
  'Designing Data-Intensive Applications by Martin Kleppmann
Clean Architecture by Robert C. Martin
The Pragmatic Programmer by David Thomas',
  'I believe in building systems that solve real problems. Every line of code should serve a purpose, and every system should be designed with scalability and maintainability in mind.

Currently focused on the intersection of AI and practical applications, particularly in signal processing and data analysis. The goal is to bridge the gap between research and real-world implementation.

Learning never stops. Every project teaches something new, every bug reveals a deeper understanding, and every challenge is an opportunity to grow.'
);
```

## Changes Made

### Updated Pages:
1. **Homepage** (`/app/page.tsx`): Updated to fetch both projects and blogs from Supabase
2. **Projects Page** (`/app/projects/page.tsx`): Already integrated with Supabase
3. **Individual Project Page** (`/app/projects/[id]/page.tsx`): Already integrated with Supabase
4. **Blogs Page** (`/app/blogs/page.tsx`): Updated to fetch data from `blogs` table
5. **Individual Blog Page** (`/app/blogs/[id]/page.tsx`): Updated to fetch individual posts from Supabase
6. **NOW Page** (`/app/now/page.tsx`): Updated to fetch data from `current_projects` and `now_page` tables

### Removed:
1. **Gallery Page**: Completely removed (`/app/gallery/` directory)
2. **Media Components**: Removed `components/media-picker.tsx` and `lib/media-data.ts`
3. **Navigation**: Removed "Gallery" link from navigation menu

### Features:
- Loading states for all pages
- Error handling with console logging
- Fallback content when no data is available
- Proper TypeScript types for all data structures
- Dynamic tag generation for blogs sidebar

## Next Steps:
1. Set up the database tables in Supabase using the SQL above
2. Insert sample data or migrate existing data
3. Test the application with `npm run dev`
4. Configure any additional RLS policies if needed
5. Deploy to production