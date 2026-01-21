import { defineType, defineField } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'サービス',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'サービス名',
      type: 'string',
      description: '例: AI動画制作、AIマンガ制作',
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
      name: 'description',
      title: 'サービス説明',
      type: 'text',
      rows: 4,
      description: 'サービスの詳細説明',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: '表示順',
      type: 'number',
      description: '小さい数字ほど先に表示されます',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      order: 'order',
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: subtitle,
      }
    },
  },
  orderings: [
    {
      title: '表示順',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
