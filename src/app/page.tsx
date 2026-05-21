import { ScrollyCanvas } from "@/components/cinematic/ScrollyCanvas";
import { NarrativeIntro } from "@/components/cinematic/NarrativeIntro";
import { ResearchArchive } from "@/components/cinematic/ResearchArchive";
import { ExperienceTimeline } from "@/components/cinematic/ExperienceTimeline";
import { ContactTerminal } from "@/components/cinematic/ContactTerminal";

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      {/* ─── SECTION 1: CINEMATIC SCROLL HERO ─── */}
      <div id="scroll-hero-container">
        <ScrollyCanvas />
      </div>

      {/* ─── SECTION 2: NARRATIVE INTRODUCTION ─── */}
      <NarrativeIntro />

      {/* ─── SECTION 3: RESEARCH ARCHIVE / PROJECTS ─── */}
      <ResearchArchive />

      {/* ─── SECTION 4: EXPERIENCE & SYSTEMS ─── */}
      <ExperienceTimeline />

      {/* ─── SECTION 5: CONTACT TERMINAL ─── */}
      <ContactTerminal />
    </main>
  );
}
