// app/(site)/page.tsx
import React, { Suspense } from "react";
import HeroHeader from "@/app/components/HeroHeader";
import IntroSection from "@/app/components/IntroSection";
import VotingTaxonomy from "@/app/components/VotingTaxonomy";
import VotingSystemsGallery from "@/app/components/VotingSystemsGallery";
import { QuoteBlock } from "@/app/components/QuoteBlock";

import { Container } from "@/app/components/Container";
import { FullBleed } from "@/app/components/FullBleed";
import Section from "@/app/components/Section";
import SectionHeading from "./components/SectionHeading";
import GeometricBleed from "./components/GeometricBleed";

export default function Home() {
  return (
    <div>
      {/* Hero stays the same (image background handled inside component) */}
      <FullBleed>
        <HeroHeader
          title="How Leaders Are Chosen"
          subtitle="An interactive guide to voting systems worldwide"
          ctaText="Explore Systems"
          ctaLink="#voting-systems"
          bgImage="https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?q=50&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          // bgImage="https://images.unsplash.com/photo-1664526936959-84bdea9f37fa?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          imageCredit="Image by guerrillabuzz"
          imageCreditLink="https://unsplash.com/@guerrillabuzz"
        />
      </FullBleed>
      {/* Contained on white */}


      <Container>
        <Section>
          <QuoteBlock>
            Voting systems are the rules that determine how votes are cast,
            counted, and turned into outcomes. Whether choosing a single leader
            like a president or filling every seat in a parliament, the voting
            system shapes not only the result — but the nature of political
            power itself.
          </QuoteBlock>
        </Section>
      </Container>


      {/* Full-bleed subtle blue gradient */}
      <Container>
        <Section>
          <SectionHeading title="Voting systems are designed to answer questions like:" />
          <IntroSection />
        </Section>
      </Container>

      {/* Contained on white */}
      <Container>
        <Section>
          <SectionHeading title="How voting systems are grouped" />
          <VotingTaxonomy />
        </Section>
      </Container>


      {/* Full-bleed geometric background */}

      <GeometricBleed variant="grid" className="bg-white/40">
        <Container>
          <Section className="min-h-screen">
            <SectionHeading id="voting-systems" title="Explore Voting Systems" />

            <Suspense fallback={<div className="text-sm text-muted-foreground">Loading gallery…</div>}>
              <VotingSystemsGallery />
            </Suspense>

          </Section>
        </Container>
      </GeometricBleed>

    </div>
  );
}
