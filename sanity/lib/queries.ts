import { defineQuery } from 'next-sanity'

// =====================================
// Portfolio Queries
// =====================================

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    _id,
    catchphrase,
    subCatchphrase,
    siteTitle,
    siteDescription,
    heroVideoSource,
    heroYoutubeUrl,
    "heroVideoFileUrl": heroVideoFile.asset->url
  }
`)

export const PROFILE_QUERY = defineQuery(`
  *[_type == "profile"][0] {
    _id,
    name,
    nameEn,
    bio,
    profileImage {
      asset->{
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    strengths[] {
      _type,
      title,
      description
    },
    workflow[] {
      _type,
      step,
      title,
      description
    },
    socialLinks[] {
      _type,
      platform,
      url
    }
  }
`)

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    order
  }
`)

export const WORKS_QUERY = defineQuery(`
  *[_type == "work"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    videoUrl,
    targetCustomer,
    duration,
    publishedAt,
    featured,
    "thumbnailUrl": thumbnail.asset->url,
    "thumbnailAlt": thumbnail.alt
  }
`)

// =====================================
// Legacy Blog Queries (from original template)
// =====================================

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...12] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "author": author->name
  }
`)

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body,
    mainImage,
    publishedAt,
    "author": author->{name, image}
  }
`)
