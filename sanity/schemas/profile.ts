import { defineType, defineField, defineArrayMember } from 'sanity'

export const profileType = defineType({
  name: 'profile',
  title: 'プロフィール',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '名前',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: '英語名',
      type: 'string',
      description: '英語表記の名前（オプション）',
    }),
    defineField({
      name: 'bio',
      title: '自己紹介文',
      type: 'text',
      rows: 5,
      description: '簡潔な自己紹介文',
      validation: (Rule) => Rule.required().min(50).max(500),
    }),
    defineField({
      name: 'profileImage',
      title: 'プロフィール画像',
      type: 'image',
      description: 'プロフィール写真（推奨サイズ: 400x400px）',
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
    defineField({
      name: 'strengths',
      title: '強み',
      type: 'array',
      description: '自分の強みや特徴（3〜5個推奨）',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'strength',
          fields: [
            defineField({
              name: 'title',
              title: 'タイトル',
              type: 'string',
              description: '例: 高速納品、丁寧なヒアリング',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: '説明',
              type: 'text',
              rows: 3,
              description: '強みの詳細説明',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'workflow',
      title: '制作フロー',
      type: 'array',
      description: '制作の流れ（ステップ順に記載）',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'workflowStep',
          fields: [
            defineField({
              name: 'step',
              title: 'ステップ番号',
              type: 'number',
              description: '例: 1, 2, 3',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'title',
              title: 'タイトル',
              type: 'string',
              description: '例: ヒアリング、企画・構成',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: '説明',
              type: 'text',
              rows: 3,
              description: 'このステップの詳細説明',
            }),
          ],
          preview: {
            select: {
              step: 'step',
              title: 'title',
              subtitle: 'description',
            },
            prepare({ step, title, subtitle }) {
              return {
                title: `${step}. ${title}`,
                subtitle: subtitle,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'SNSリンク',
      type: 'array',
      description: 'SNSやWebサイトのリンク',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'プラットフォーム',
              type: 'string',
              options: {
                list: [
                  { title: 'Twitter (X)', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Website', value: 'website' },
                  { title: 'その他', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare({ platform, url }) {
              const platformLabel =
                platform === 'twitter'
                  ? 'Twitter'
                  : platform === 'instagram'
                    ? 'Instagram'
                    : platform === 'youtube'
                      ? 'YouTube'
                      : platform === 'facebook'
                        ? 'Facebook'
                        : platform === 'linkedin'
                          ? 'LinkedIn'
                          : platform === 'github'
                            ? 'GitHub'
                            : platform === 'website'
                              ? 'Website'
                              : 'その他'
              return {
                title: platformLabel,
                subtitle: url,
              }
            },
          },
        }),
      ],
    }),
  ],
})
