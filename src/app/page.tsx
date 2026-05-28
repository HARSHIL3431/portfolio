import MinimalNav from '@/components/layout/MinimalNav'
import { ScrollyCanvas } from '@/components/cinematic/ScrollyCanvas'
import NarrativeIntro from '@/components/cinematic/NarrativeIntro'
import TechStack from '@/components/cinematic/TechStack'
import ResearchArchive from '@/components/cinematic/ResearchArchive'
import ExperienceTimeline from '@/components/cinematic/ExperienceTimeline'
import ContactTerminal from '@/components/cinematic/ContactTerminal'

export default function Page() {
  return (
    <>
      <MinimalNav />
      {/* Hero — 600vh scroll-scrubbed cinematic sequence */}
      <ScrollyCanvas />
      {/* Sticky cinematic scenes — stacked sequentially */}
      <NarrativeIntro />
      <TechStack />
      <ResearchArchive />
      <ExperienceTimeline />
      <ContactTerminal />
    </>
  )
}
