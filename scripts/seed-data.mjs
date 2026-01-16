import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
})

const testData = [
  // 1. Site Settings
  {
    _type: 'siteSettings',
    _id: 'siteSettings',
    catchphrase: 'AIで、映像の常識を変える',
    subCatchphrase: 'AI動画・AI漫画・デザインで、あなたのビジネスを加速',
    heroVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    siteTitle: 'KENJIROU Portfolio',
    siteDescription: 'AI動画制作・AI漫画・デザインサービスのポートフォリオサイト',
  },

  // 2. Profile
  {
    _type: 'profile',
    _id: 'profile',
    name: '林 憲二郎',
    nameEn: 'Kenjirou Hayashi',
    bio: 'デザイン歴12年。AIを活用した動画・漫画制作を行っています。キャラクターの一貫性を保ったAI動画制作が強みです。最新のAI技術と従来のクリエイティブスキルを組み合わせ、クライアントのビジョンを形にします。',
    strengths: [
      {
        _type: 'strength',
        title: 'キャラクター一貫性',
        description: 'AIでもキャラクターの一貫性を保った動画制作が可能',
      },
      {
        _type: 'strength',
        title: 'デザイン経験',
        description: '12年のデザイン経験を活かした高品質な映像制作',
      },
      {
        _type: 'strength',
        title: 'スピード納品',
        description: 'AIの活用により、短納期での制作に対応',
      },
    ],
    workflow: [
      {
        _type: 'workflowStep',
        step: 1,
        title: 'ヒアリング',
        description: 'お客様のご要望を丁寧にお伺いします',
      },
      {
        _type: 'workflowStep',
        step: 2,
        title: '企画・構成',
        description: 'ヒアリング内容を元に企画と構成を作成します',
      },
      {
        _type: 'workflowStep',
        step: 3,
        title: '制作',
        description: 'AIを活用して効率的に制作を進めます',
      },
      {
        _type: 'workflowStep',
        step: 4,
        title: '納品',
        description: '完成した作品を納品し、フォローアップします',
      },
    ],
    socialLinks: [
      {
        _type: 'socialLink',
        platform: 'twitter',
        url: 'https://twitter.com/example',
      },
    ],
  },

  // 3. Services
  {
    _type: 'service',
    _id: 'service-ai-video',
    title: 'AI動画制作',
    slug: {
      _type: 'slug',
      current: 'ai-video',
    },
    description: 'AIを活用した高品質な動画制作サービス。キャラクターの一貫性を保ちながら、短期間で魅力的な映像を制作します。企画から編集まで一貫して対応します。',
    icon: '🎬',
    order: 1,
  },
  {
    _type: 'service',
    _id: 'service-ai-manga',
    title: 'AI漫画制作',
    slug: {
      _type: 'slug',
      current: 'ai-manga',
    },
    description: 'AIを活用した漫画・イラスト制作サービス。広告漫画、説明漫画など、様々な用途に対応します。オリジナルキャラクターの制作も可能です。',
    icon: '📚',
    order: 2,
  },
  {
    _type: 'service',
    _id: 'service-design',
    title: 'デザイン',
    slug: {
      _type: 'slug',
      current: 'design',
    },
    description: '12年の経験を活かしたデザインサービス。ロゴ、バナー、Webデザインなど幅広く対応。AIツールを駆使して高品質なビジュアルを提供します。',
    icon: '🎨',
    order: 3,
  },

  // 4. Works
  {
    _type: 'work',
    _id: 'work-ai-video-sample',
    title: 'AI動画サンプル作品',
    slug: {
      _type: 'slug',
      current: 'ai-video-sample',
    },
    category: 'ai-video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    targetCustomer: '飲食店・小売店向け',
    duration: '30秒',
    description: 'AIを活用して制作したプロモーション動画のサンプルです。キャラクターの一貫性を保ちながら、魅力的なストーリーテリングを実現しました。',
    publishedAt: '2024-01-01T00:00:00Z',
    featured: true,
  },
  {
    _type: 'work',
    _id: 'work-ai-manga-sample',
    title: 'AI漫画サンプル作品',
    slug: {
      _type: 'slug',
      current: 'ai-manga-sample',
    },
    category: 'ai-manga',
    targetCustomer: 'BtoB企業向け',
    description: 'AIを活用して制作した説明漫画のサンプルです。複雑なサービス内容を分かりやすく伝えることができました。',
    publishedAt: '2024-02-01T00:00:00Z',
    featured: true,
  },
]

async function seedData() {
  console.log('🌱 Sanity テストデータ投入を開始します...\n')

  // 環境変数チェック
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ エラー: NEXT_PUBLIC_SANITY_PROJECT_ID が設定されていません')
    process.exit(1)
  }

  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    console.error('❌ エラー: NEXT_PUBLIC_SANITY_DATASET が設定されていません')
    process.exit(1)
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ エラー: SANITY_API_TOKEN が設定されていません')
    console.error('   scripts/get-sanity-token-instructions.md を参照してトークンを取得してください\n')
    process.exit(1)
  }

  console.log(`📋 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`📋 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)
  console.log(`📋 投入するドキュメント数: ${testData.length}\n`)

  let successCount = 0
  let errorCount = 0

  for (const doc of testData) {
    try {
      const result = await client.createOrReplace(doc)
      console.log(`✅ ${doc._type}: ${doc._id || doc.title}`)
      successCount++
    } catch (error) {
      console.error(`❌ ${doc._type} の作成に失敗:`, error.message)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`\n🎉 テストデータ投入完了!`)
  console.log(`   成功: ${successCount} 件`)
  console.log(`   失敗: ${errorCount} 件\n`)

  if (errorCount === 0) {
    console.log('✅ すべてのデータが正常に投入されました')
    console.log('\n次のステップ:')
    console.log('1. Sanity Studio で確認: http://localhost:3000/studio')
    console.log('2. GROQ クエリで検証: node scripts/verify-data.mjs')
  } else {
    console.log('⚠️  一部のデータ投入に失敗しました')
    console.log('   エラー内容を確認してください')
  }
}

seedData().catch((error) => {
  console.error('\n❌ スクリプト実行エラー:', error)
  process.exit(1)
})
