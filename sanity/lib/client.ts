import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Controla si deseas utilizar la Content Delivery Network (CDN) de Sanity para obtener tus datos.
  // ¿Qué es CDN? Es un servicio que cachea los datos de tu proyecto en ubicaciones geográficas distribuidas, lo que mejora la velocidad de acceso.

  // Usar un CDN en True es ideal en proyectos donde necesitas datos actualizados al momento (por ejemplo, dashboards o sitios dinámicos con ISR o SSR).
  
  // Usar un CDN en False es ideal para aplicaciones donde los datos no cambian frecuentemente (por ejemplo, sitios estáticos o blogs).

})

// The useCdn parameter (set to true in this configuration) determines whether your application fetches data from Sanity's Content Delivery Network (CDN) or directly from the Sanity API.
// What is Sanity's CDN?
// Sanity's CDN is a globally distributed network of servers that cache your content. When enabled:

// The first request for a specific query fetches data from Sanity's main API
// This data is then cached on CDN servers around the world
// Subsequent identical queries are served from the nearest CDN server instead of reaching back to Sanity's main database

// Benefits of useCdn: true

// Improved Performance: Reduces latency by serving content from geographically closer servers
// Reduced Load Times: Cached responses are delivered faster than regenerated ones
// Scalability: Better handling of traffic spikes since cached content doesn't hit your Sanity project's rate limits
// Cost Efficiency: Reduces the number of API calls to Sanity's main servers, which can help if you're on a usage-based plan

// When to Use useCdn: true
// This setting is ideal for:

// Public-facing pages with content that doesn't need to be real-time
// Static site generation (SSG) or Incremental Static Regeneration (ISR) rendering methods
// High-traffic websites where performance is critical
// Content that changes infrequently such as blog posts, product descriptions, or marketing pages

// Considerations and Limitations

// Caching Period: Content is typically cached for 60 seconds in Sanity's CDN
// Stale Data: There may be up to a minute delay before updated content appears on your site
// Cache Invalidation: Changing content in Sanity doesn't immediately update the CDN cache
// GROQ/GraphQL Queries: The exact query (including parameters) must match for a CDN cache hit