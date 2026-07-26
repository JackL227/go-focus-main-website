import type { MetadataRoute } from 'next';
import { cases, site } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/work', '/pricing', '/about', '/contact'];

  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...cases.map((c) => ({
      url: `${site.url}/work/${c.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
