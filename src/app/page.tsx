// app/(site)/page.tsx
import React from "react";
import HeroHeader from "@/app/components/HeroHeader";
import IntroSection from "@/app/components/IntroSection";
import VotingTaxonomy from "@/app/components/VotingTaxonomy";
import VotingSystemsGallery from "@/app/components/VotingSystemsGallery";
import { TaxonomySystems, VotingSystems } from "@/lib/taxonomy/catalog";
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
          bgImage="https://images.unsplash.com/photo-1643228995868-bf698f67d053?w=1400&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NXx8fGVufDB8fHx8fA%3D%3D"
          imageCredit="Image by Natt"
          imageCreditLink="https://unsplash.com/@nattgw"
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
          <SectionHeading title="At their core, voting systems are designed to answer questions like:" />
          <IntroSection />
        </Section>
      </Container>

      {/* Contained on white */}
      <Container>
        <Section>
          <VotingTaxonomy />
        </Section>
      </Container>

      {/* Full-bleed geometric background */}

      <GeometricBleed variant="grid" className="bg-white">
        <Container>
          <Section className="min-h-screen">
            <SectionHeading id="voting-systems" title="Explore Voting Systems" />
            <VotingSystemsGallery
              systems={VotingSystems}
              taxonomy={TaxonomySystems}
            />
          </Section>
        </Container>
      </GeometricBleed>

    </div>
  );
}
