import { defineType, defineField } from 'sanity'

export const workType = defineType({
  name: 'work',
  title: '制作実績',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '作品タイトル',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      description: 'URL用のスラッグ（自動生成）',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'カテゴリ',
      type: 'string',
      options: {
        list: [
          { title: 'AI動画', value: 'ai-video' },
          { title: 'AIマンガ', value: 'ai-manga' },
          { title: 'デザイン', value: 'design' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'サムネイル画像',
      type: 'image',
      description: '作品のサムネイル（推奨サイズ: 1280x720px）',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: '代替テキスト',
          type: 'string',
          description: '画像の説明文（アクセシビリティ対応）',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: '動画URL',
      type: 'url',
      description: 'YouTube動画のURL（動画作品の場合のみ）',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'targetCustomer',
      title: 'ターゲット顧客',
      type: 'string',
      description: '例: 飲食店向け、ECサイト向け',
    }),
    defineField({
      name: 'duration',
      title: '尺・サイズ',
      type: 'string',
      description: '例: 30秒、1分、A4サイズ',
    }),
    defineField({
      name: 'description',
      title: '作品説明',
      type: 'text',
      rows: 4,
      description: '作品の詳細説明・制作ポイント',
    }),
    defineField({
      name: 'publishedAt',
      title: '制作日',
      type: 'datetime',
      description: '作品の制作日または公開日',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'トップページに表示',
      type: 'boolean',
      description: 'ONにするとトップページの注目作品に表示されます',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'thumbnail',
      featured: 'featured',
    },
    prepare({ title, category, media, featured }) {
      const categoryLabel =
        category === 'ai-video'
          ? 'AI動画'
          : category === 'ai-manga'
            ? 'AIマンガ'
            : 'デザイン'
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: categoryLabel,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: '制作日（新しい順）',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: '制作日（古い順）',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
})
