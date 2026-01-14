import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { POSTS_QUERY } from '@/sanity/lib/queries'

export default async function HomePage() {
  const posts = await client.fetch(POSTS_QUERY).catch(() => [])

  return (
    <div className="min-h-screen bg-background p-8">
      <main className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          ポートフォリオサイト
        </h1>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-zinc-900">
          <h2 className="mb-4 text-2xl font-semibold">Sanity Studio へようこそ</h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            コンテンツを管理するには、以下のリンクからSanity Studioにアクセスしてください。
          </p>
          <Link
            href="/studio"
            className="inline-block rounded-full bg-foreground px-6 py-3 text-background transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-300"
          >
            Studio を開く
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">ブログ記事</h2>
          {posts.length === 0 ? (
            <p className="text-zinc-600 dark:text-zinc-400">
              まだ記事がありません。Sanity Studioで記事を作成してください。
            </p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post: any) => (
                <li
                  key={post._id}
                  className="rounded-lg bg-white p-6 shadow-md dark:bg-zinc-900"
                >
                  <h3 className="mb-2 text-xl font-semibold">
                    <Link
                      href={`/posts/${post.slug.current}`}
                      className="hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && (
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {post.excerpt}
                    </p>
                  )}
                  {post.publishedAt && (
                    <p className="mt-2 text-sm text-zinc-500">
                      {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
