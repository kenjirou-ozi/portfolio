import { client } from '@/sanity/lib/client'
import {
  SITE_SETTINGS_QUERY,
  PROFILE_QUERY,
  SERVICES_QUERY,
  WORKS_QUERY,
} from '@/sanity/lib/queries'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Works } from '@/components/sections/Works'
import { Profile } from '@/components/sections/Profile'
import { Contact } from '@/components/sections/Contact'

export default async function HomePage() {
  // Fetch all data from Sanity
  const [siteSettings, profile, services, works] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY).catch(() => null),
    client.fetch(PROFILE_QUERY).catch(() => null),
    client.fetch(SERVICES_QUERY).catch(() => []),
    client.fetch(WORKS_QUERY).catch(() => []),
  ])

  // Fallback data if Sanity fetch fails
  const heroData = {
    catchphrase: siteSettings?.catchphrase || 'AIで、映像の常識を変える',
    subCatchphrase: siteSettings?.subCatchphrase || 'AI動画・AI漫画・デザインで、あなたのビジネスを加速',
    heroVideoUrl: siteSettings?.heroVideoUrl,
  }

  const profileData = {
    name: profile?.name || '林 憲二郎',
    nameEn: profile?.nameEn,
    bio: profile?.bio || 'デザイン歴12年。AIを活用した動画・漫画制作を行っています。',
    strengths: profile?.strengths || [],
    workflow: profile?.workflow || [],
  }

  return (
    <div className="relative">
      <Header />

      <main>
        <Hero {...heroData} />

        {services.length > 0 && <Services services={services} />}

        {works.length > 0 && <Works works={works} />}

        <Profile {...profileData} />

        <Contact />
      </main>

      <Footer socialLinks={profile?.socialLinks} />
    </div>
  )
}
