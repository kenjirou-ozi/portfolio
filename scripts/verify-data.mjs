import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
})

async function verifyData() {
  console.log('🔍 Sanity データ検証を開始します...\n')

  const queries = {
    siteSettings: `*[_type == "siteSettings"][0]`,
    profile: `*[_type == "profile"][0]`,
    services: `*[_type == "service"] | order(order asc)`,
    works: `*[_type == "work"] | order(publishedAt desc)`,
  }

  try {
    // 1. siteSettings
    console.log('📋 1. サイト設定 (siteSettings)')
    const siteSettings = await client.fetch(queries.siteSettings)
    if (siteSettings) {
      console.log(`   ✅ データ確認: ${siteSettings.catchphrase}`)
      console.log(`      - サイトタイトル: ${siteSettings.siteTitle}`)
      console.log(`      - 動画URL: ${siteSettings.heroVideoUrl}`)
    } else {
      console.log('   ❌ データが見つかりません')
    }

    // 2. profile
    console.log('\n📋 2. プロフィール (profile)')
    const profile = await client.fetch(queries.profile)
    if (profile) {
      console.log(`   ✅ データ確認: ${profile.name}`)
      console.log(`      - 英語名: ${profile.nameEn || 'なし'}`)
      console.log(`      - 強みの数: ${profile.strengths?.length || 0} 件`)
      console.log(`      - 制作フローの数: ${profile.workflow?.length || 0} ステップ`)
    } else {
      console.log('   ❌ データが見つかりません')
    }

    // 3. services
    console.log('\n📋 3. サービス (service)')
    const services = await client.fetch(queries.services)
    if (services && services.length > 0) {
      console.log(`   ✅ データ確認: ${services.length} 件`)
      services.forEach((service, index) => {
        console.log(`      ${index + 1}. ${service.icon || '📌'} ${service.title} (表示順: ${service.order})`)
      })
    } else {
      console.log('   ❌ データが見つかりません')
    }

    // 4. works
    console.log('\n📋 4. 制作実績 (work)')
    const works = await client.fetch(queries.works)
    if (works && works.length > 0) {
      console.log(`   ✅ データ確認: ${works.length} 件`)
      works.forEach((work, index) => {
        const featured = work.featured ? '⭐ ' : ''
        const category =
          work.category === 'ai-video'
            ? 'AI動画'
            : work.category === 'ai-manga'
              ? 'AIマンガ'
              : 'デザイン'
        console.log(`      ${index + 1}. ${featured}${work.title} [${category}]`)
      })
    } else {
      console.log('   ❌ データが見つかりません')
    }

    // サマリー
    console.log('\n' + '='.repeat(50))
    console.log('\n📊 検証結果サマリー:')
    console.log(`   - サイト設定: ${siteSettings ? '✅' : '❌'} 1 件`)
    console.log(`   - プロフィール: ${profile ? '✅' : '❌'} 1 件`)
    console.log(`   - サービス: ${services?.length > 0 ? '✅' : '❌'} ${services?.length || 0} 件`)
    console.log(`   - 制作実績: ${works?.length > 0 ? '✅' : '❌'} ${works?.length || 0} 件\n`)

    const allSuccess = siteSettings && profile && services?.length > 0 && works?.length > 0

    if (allSuccess) {
      console.log('🎉 すべてのデータが正常に確認できました！')
      console.log('\n次のステップ:')
      console.log('1. Sanity Studio で確認: http://localhost:3000/studio')
      console.log('2. Phase 3 (フロントエンド実装) への準備完了\n')
    } else {
      console.log('⚠️  一部のデータが見つかりませんでした')
      console.log('   scripts/seed-data.mjs を実行してテストデータを投入してください\n')
    }
  } catch (error) {
    console.error('\n❌ データ検証エラー:', error.message)
    process.exit(1)
  }
}

verifyData().catch((error) => {
  console.error('\n❌ スクリプト実行エラー:', error)
  process.exit(1)
})
