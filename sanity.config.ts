'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',

  projectId,
  dataset,
  basePath: '/studio', // Studio埋め込みパス

  plugins: [
    structureTool(),
    visionTool(), // GROQクエリテスト用
  ],

  schema: {
    types: schemaTypes,
  },
})
