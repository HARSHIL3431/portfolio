import MinimalNav from '@/components/layout/MinimalNav'
import AboutSection from '@/components/cinematic/AboutSection'
import { ScrollyCanvas } from '@/components/cinematic/ScrollyCanvas'
import { SceneBreath } from '@/components/cinematic/SceneBreath'
import NarrativeIntro from '@/components/cinematic/NarrativeIntro'
import ExpertiseSection from '@/components/cinematic/ExpertiseSection'
import TechStack from '@/components/cinematic/TechStack'
import ResearchArchive from '@/components/cinematic/ResearchArchive'
import ExperienceTimeline from '@/components/cinematic/ExperienceTimeline'
import FutureVision from '@/components/cinematic/FutureVision'
import ContactTerminal from '@/components/cinematic/ContactTerminal'

export default function Page() {
  return (
    <>
      <MinimalNav />

      {/* ═══ WHO I AM ═══ Hero — cinematic portrait sequence */}
      <ScrollyCanvas />

      {/* All content after hero sits above the hero's fixed overlay (z-10) */}
      <div className="relative z-20">
        {/* Breathing room — transition from person to work */}
        <SceneBreath height="12vh" glow glowColor="rgba(0, 212, 240, 0.025)" />

        {/* ═══ WHO I AM ═══ About — portrait, bio, links */}
        <AboutSection />

        {/* Breathing room */}
        <SceneBreath height="8vh" />

        {/* ═══ HOW I THINK ═══ Philosophy & identity */}
        <NarrativeIntro />

        {/* Breathing room */}
        <SceneBreath height="8vh" />

        {/* ═══ EXPERTISE ═══ What I build */}
        <ExpertiseSection />

        {/* Breathing room */}
        <SceneBreath height="8vh" />

        {/* ═══ WHAT I BUILD ═══ Immersive project showcase */}
        <ResearchArchive />

        {/* Breathing room — shift from projects to capabilities */}
        <SceneBreath height="10vh" glow glowColor="rgba(232, 168, 124, 0.02)" />

        {/* ═══ CAPABILITIES ═══ Intelligent skill visualization */}
        <TechStack />

        {/* Breathing room */}
        <SceneBreath height="8vh" />

        {/* ═══ EXPERIENCE ═══ Cinematic narrative */}
        <ExperienceTimeline />

        {/* Breathing room — transition to intimate closing */}
        <SceneBreath height="10vh" glow glowColor="rgba(0, 212, 240, 0.02)" />

        {/* ═══ FUTURE VISION ═══ Brief cinematic coda */}
        <FutureVision />

        {/* ═══ CONTACT ═══ Establish connection */}
        <ContactTerminal />
      </div>
    </>
  )
}
