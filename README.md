# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Supabase, featuring dynamic content management and a clean, developer-focused design.

## Features

- 🎯 **Project Showcase** - Pinnable featured projects with horizontal scroll on mobile
- 📜 **Certifications** - Display professional credentials with status tracking
- 📝 **Blog System** - Dynamic posts with auto-calculated read times
- 📬 **Contact Forms** - Integrated forms with Supabase backend
- 📱 **Mobile-First Design** - Fully responsive across all devices
- 🎨 **Modern UI** - Parallax effects, smooth animations, dark/light mode

## Tech Stack

- **Framework:** Next.js 15.2.4
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/ak-1344/Portfolio.git
cd Portfolio
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Configure Supabase RLS policies

Run the SQL script in your Supabase SQL Editor:
```bash
# See version_info/supabase-rls-setup.sql
```

5. Run the development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── blogs/             # Blog listing and detail pages
│   ├── certifications/    # Certifications showcase
│   ├── contact/           # Contact page
│   ├── now/               # Current focus page
│   ├── projects/          # Projects listing and detail
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utilities and helpers
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── version_info/          # Documentation and setup guides
```

## Database Setup

The application requires the following Supabase tables:
- `projects` - Project portfolio items
- `blogs` - Blog posts
- `certifications` - Professional certifications
- `contact_messages` - Contact form submissions
- `now_projects` - Current focus items
- `now_meta` - Personal updates

See `version_info/CORRECTED_SCHEMA_UPDATE.md` for the complete schema.

## Build & Deploy

```bash
# Production build
pnpm build

# Start production server
pnpm start
```

Deploy to Vercel, Netlify, or any Next.js-compatible platform.

## Documentation

- **v2.0.0 Release Notes:** `version_info/v2.0.0.md`
- **Contact Form Setup:** `version_info/CONTACT_FORM_SETUP.md`
- **Todo List:** `version_info/v2_ToDo.md`
- **Future Updates:** `version_info/FutureUpdates.md`

## Troubleshooting

### Contact Form Not Working
Run the RLS policy setup script in Supabase. See `version_info/CONTACT_FORM_SETUP.md` for detailed instructions.

### Build Errors
Ensure all environment variables are set correctly and Supabase is accessible.

## License

MIT License - feel free to use this project as inspiration for your own portfolio.

## Contact

- **Email:** adityakhatkar97.3@gmail.com
- **GitHub:** [@ak-1344](https://github.com/ak-1344)
- **LinkedIn:** [Aditya](https://linkedin.com/in/aditya1344)

---

Built with ❤️ using Next.js and Supabase
