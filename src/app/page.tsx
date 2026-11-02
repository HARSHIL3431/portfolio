import MinimalNav from '@/components/layout/MinimalNav'
import Hero from '@/components/hero/Hero'
import AboutSection from '@/components/cinematic/AboutSection'
import ExpertiseSection from '@/components/cinematic/ExpertiseSection'
import ResearchArchive from '@/components/cinematic/ResearchArchive'
import ExperienceTimeline from '@/components/cinematic/ExperienceTimeline'
import ContactTerminal from '@/components/cinematic/ContactTerminal'

export default function Page() {
  return (
    <>
      <MinimalNav />

      {/* ✦ Hero — compact, typography-led, no photography */}
      <Hero />

      {/* All content after hero sits above the fixed atmosphere (z-[2]) */}
      <div className="relative z-20">
        <AboutSection />
        <ExpertiseSection />
        <ResearchArchive />
        <ExperienceTimeline />
        <ContactTerminal />
      </div>
    </>
  )
}