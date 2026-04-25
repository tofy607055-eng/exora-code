import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/admin/login'],
      },
    ],
    sitemap: 'https://exoracode.com/sitemap.xml',
    host: 'https://exoracode.com',
  }
}
