'use client'

import { defineConfig } from 'sanity'
import { structureTool, StructureBuilder } from 'sanity/structure'
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
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('コンテンツ')
          .items([
            // サイト設定（シングルトン）
            S.listItem()
              .title('サイト設定')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            // プロフィール（シングルトン）
            S.listItem()
              .title('プロフィール')
              .id('profile')
              .child(
                S.document()
                  .schemaType('profile')
                  .documentId('profile')
              ),
            // 区切り線
            S.divider(),
            // サービス
            S.listItem()
              .title('サービス')
              .schemaType('service')
              .child(S.documentTypeList('service').title('サービス一覧')),
            // 制作実績
            S.listItem()
              .title('制作実績')
              .schemaType('work')
              .child(S.documentTypeList('work').title('制作実績一覧')),
          ]),
    }),
    visionTool(), // GROQクエリテスト用
  ],

  schema: {
    types: schemaTypes,
  },
})
