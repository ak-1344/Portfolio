import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aditya - Portfolio',
    short_name: 'Aditya',
    description: 'Backend Developer | Leader | Explorer. Explore projects, certifications, and blog posts by Aditya.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons8-portfolio-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icons8-portfolio-64.png',
        sizes: '64x64',
        type: 'image/png',
      },
    ],
  }
}
