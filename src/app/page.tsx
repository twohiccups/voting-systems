// app/(site)/page.tsx
import React from "react";
import HeroHeader from "@/app/components/HeroHeader";
import IntroSection from "@/app/components/IntroSection";
import VotingTaxonomy from "@/app/components/VotingTaxonomy";
import VotingSystemsGallery from "@/app/components/VotingSystemsGallery";
import { TaxonomySystems, VotingSystems } from "@/lib/taxonomy/data";
import { QuoteBlock } from "@/app/components/QuoteBlock";

import { Container } from "@/app/components/Container";
import { FullBleed } from "@/app/components/FullBleed";
import Section from "@/app/components/Section";
import SectionHeading from "./components/SectionHeading";

export default function Home() {
  return (
    <div>
      {/* Hero stays the same (image background handled inside component) */}
      <FullBleed>
        <HeroHeader
          title="How Leaders Are Chosen"
          subtitle="An interactive guide to voting systems worldwide"
          ctaText="Explore Systems"
          ctaLink="#systems"
          bgImage="/images/voting-bg.jpg"
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
      <FullBleed className="bg-gradient-to-r from-blue-100 via-cyan-50 to-blue-200">
        <Container>
          <Section>
            <IntroSection />
          </Section>
        </Container>
      </FullBleed>

      {/* Contained on white */}
      <Container>
        <Section>
          <VotingTaxonomy />
        </Section>
      </Container>

      {/* Full-bleed subtle blue gradient */}
      <FullBleed
        className="bg-gradient-to-r from-blue-100 via-cyan-50 to-blue-200"
      >
        <Container>
          <Section>
            <SectionHeading title="Explore Voting Systems" />
            <VotingSystemsGallery
              systems={VotingSystems}
              taxonomy={TaxonomySystems}
            />
          </Section>
        </Container>
      </FullBleed>
    </div>
  );
}
