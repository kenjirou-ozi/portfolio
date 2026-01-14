import { defineType, defineField } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'サイト設定',
  type: 'document',
  fields: [
    defineField({
      name: 'catchphrase',
      title: 'キャッチコピー',
      type: 'string',
      description: 'ファーストビューに表示するメインのキャッチコピー',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subCatchphrase',
      title: 'サブキャッチコピー',
      type: 'string',
      description: 'キャッチコピーの補足説明',
    }),
    defineField({
      name: 'heroVideoUrl',
      title: '代表動画URL',
      type: 'url',
      description: 'ファーストビューに表示するYouTube動画のURL',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'siteTitle',
      title: 'サイトタイトル',
      type: 'string',
      description: 'SEO用のサイトタイトル（<title>タグに使用）',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'siteDescription',
      title: 'サイト説明文',
      type: 'text',
      rows: 3,
      description: 'SEO用のサイト説明文（meta descriptionに使用）',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'OGP画像',
      type: 'image',
      description: 'SNSシェア時に表示される画像（推奨サイズ: 1200x630px）',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: '代替テキスト',
          type: 'string',
          description: '画像の説明文（アクセシビリティ対応）',
        }),
      ],
    }),
  ],
})
