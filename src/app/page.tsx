import HeroHeader from "@/app/components/HeroHeader";
import IntroSection from "./components/IntroSection";
import VotingTaxonomy from "./components/VotingTaxonomy";
import VotingSystemsGallery from "./components/VotingSystemsGallery";
import { TaxonomySystems, VotingSystems } from "./content/TaxonomySystemsData";
import { QuoteBlock } from "./components/QuoteBlock";
import React from "react";
import Section from "./components/Section";


export default function Home() {
  return (
    <div>
      <HeroHeader
        title="How Leaders Are Chosen"
        subtitle="An interactive guide to voting systems worldwide"
        ctaText="Explore Systems"
        ctaLink="#systems"
        bgImage="/images/voting-bg.jpg" // Place your image in public/images
      />

      <main className="py-12 sm:py-16 lg:py-24 px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
        <div className="space-y-12 sm:space-y-16 lg:space-y-24">
          <Section>
            <QuoteBlock>
              Voting systems are the rules that determine how votes are cast,
              counted, and turned into outcomes. Whether choosing a single leader
              like a president or filling every seat in a parliament, the voting
              system shapes not only the result — but the nature of political
              power itself.
            </QuoteBlock>
          </Section>

          <Section>
            <IntroSection />
          </Section>

          <Section>
            <VotingTaxonomy />
          </Section>

          <Section>
            <section id="systems" className="scroll-mt-24">
              <VotingSystemsGallery
                systems={VotingSystems}
                taxonomy={TaxonomySystems}
                heading="Explore Voting Systems"
                intro="Here are some concrete examples, organized by the six core taxonomy types."
              />
            </section>
          </Section>
        </div>
      </main>

      <footer className="border-t">
        <div className="py-12 sm:py-16 lg:py-24 text-center px-6 sm:px-8 lg:px-12 max-w-screen-xl mx-auto">
          Footer
        </div>
      </footer>
    </div>
  );
}
