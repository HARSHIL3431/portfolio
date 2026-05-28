import MinimalNav from '@/components/layout/MinimalNav'
import { ScrollyCanvas } from '@/components/cinematic/ScrollyCanvas'
import NarrativeIntro from '@/components/cinematic/NarrativeIntro'
import TechStack from '@/components/cinematic/TechStack'
import ResearchArchive from '@/components/cinematic/ResearchArchive'
import ExperienceTimeline from '@/components/cinematic/ExperienceTimeline'
// import CertificationsGrid from '@/components/cinematic/CertificationsGrid'
import ContactTerminal from '@/components/cinematic/ContactTerminal'

export default function Page() {
  return (
    <>
      <MinimalNav />
      <ScrollyCanvas />
      <main>
        <NarrativeIntro />
        <TechStack />
        <ResearchArchive />
        <ExperienceTimeline />
        {/* Certifications Grid temporarily disabled */}
        {/* <CertificationsGrid /> */}
        <ContactTerminal />
      </main>
    </>
  )
}
