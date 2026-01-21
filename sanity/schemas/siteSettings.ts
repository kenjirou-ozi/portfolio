import { defineType, defineField } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'サイト設定',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero動画設定' },
    { name: 'seo', title: 'SEO設定' },
  ],
  fields: [
    // Hero Section - Catchphrase
    defineField({
      name: 'catchphrase',
      title: 'キャッチコピー',
      type: 'string',
      description: 'ファーストビューに表示するメインのキャッチコピー',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'subCatchphrase',
      title: 'サブキャッチコピー',
      type: 'string',
      description: 'キャッチコピーの補足説明',
      group: 'hero',
    }),

    // Hero Video Source Toggle
    defineField({
      name: 'heroVideoSource',
      title: 'Hero動画ソース選択',
      type: 'string',
      description: 'フロントエンドに表示する動画ソースを選択',
      options: {
        list: [
          { title: 'YouTube動画を使用', value: 'youtube' },
          { title: 'MP4ファイルを使用', value: 'mp4' },
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',
      group: 'hero',
    }),

    // YouTube Video URL
    defineField({
      name: 'heroYoutubeUrl',
      title: 'Hero動画 (YouTube)',
      type: 'url',
      description: 'YouTube動画のURL。推奨: 16:9アスペクト比',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
      hidden: ({ document }) => document?.heroVideoSource === 'mp4',
      group: 'hero',
    }),

    // MP4 Video File
    defineField({
      name: 'heroVideoFile',
      title: 'Hero動画 (MP4ファイル)',
      type: 'file',
      description: '推奨: MP4形式、1920x1080px、30秒以内、10MB以下',
      options: {
        accept: 'video/mp4',
      },
      hidden: ({ document }) => document?.heroVideoSource === 'youtube',
      group: 'hero',
    }),

    // SEO Settings
    defineField({
      name: 'siteTitle',
      title: 'サイトタイトル',
      type: 'string',
      description: 'SEO用のサイトタイトル（<title>タグに使用）',
      validation: (Rule) => Rule.required().max(60),
      group: 'seo',
    }),
    defineField({
      name: 'siteDescription',
      title: 'サイト説明文',
      type: 'text',
      rows: 3,
      description: 'SEO用のサイト説明文（meta descriptionに使用）',
      validation: (Rule) => Rule.required().max(160),
      group: 'seo',
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
      group: 'seo',
    }),
  ],
})
