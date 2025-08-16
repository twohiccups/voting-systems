import HeroHeader from "@/app/components/HeroHeader";
import IntroSection from "./components/IntroSection";
import VotingTaxonomy from "./components/VotingTaxonomy";
import VotingSystemsGallery from "./components/VotingSystemsGallery";
import { TaxonomySystems, VotingSystems } from "./content/TaxonomySystems";

export default function Home() {
  return (
    <div className="font-sans">
      <HeroHeader
        title="How Leaders Are Chosen"
        subtitle="An interactive guide to voting systems worldwide"
        ctaText="Explore Systems"
        ctaLink="#systems"
        bgImage="/images/voting-bg.jpg" // Place your image in public/images
      />
      <main className="p-8 sm:p-20">
        <IntroSection />
        <VotingTaxonomy />
        {/* <VotingSystems /> */}



        <section id="systems">
          <VotingSystemsGallery
            systems={VotingSystems}
            taxonomy={TaxonomySystems}
            heading="Explore Voting Systems"
            intro="Here are some concrete examples, organized by the six core taxonomy types."
          />
        </section>
      </main>
      <footer className="py-8 text-center border-t">Footer</footer>
    </div >
  );
}
