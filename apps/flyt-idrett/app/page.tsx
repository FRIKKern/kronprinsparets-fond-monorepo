import { client } from "@/lib/sanity";
import { SITE_SETTINGS_QUERY } from "@/lib/queries";
import { Layout } from "@/components/Layout";
import { SectionCard } from "@/components/SectionCard";
import { HeroSection, HeroTitle, HeroSubtitle, HeroDescription, HeroActions } from "@/components/HeroSection";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { BlockContent } from "@kpf/ui";
import { getPageColor } from "@/lib/helpers";
import { buildImageUrl } from "@/lib/sanity";
import Image from "next/image";

export const revalidate = 30;

async function getLandingPageData() {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY);
  return siteSettings;
}

export default async function HomePage() {
  const siteSettings = await getLandingPageData();
  const themeColor = getPageColor("/");

  const mainSections = siteSettings?.mainSections || [];
  const landingPageImages = siteSettings?.landingPageImages || [];

  return (
    <Layout 
      themeColor={themeColor} 
      standardPadding 
      maxWidth
      footerContactLabel={siteSettings?.footerContactLabel}
      footerContactName={siteSettings?.footerContactName}
      footerContactEmail={siteSettings?.footerContactEmail}
    >
      <HeroSection>
        <HeroTitle>Flyt Idrett</HeroTitle>
        
        {siteSettings?.landingPageIntro ? (
          <HeroDescription>
            <BlockContent blocks={siteSettings.landingPageIntro} />
          </HeroDescription>
        ) : (
          <HeroSubtitle>
            Digital kulturplattform som hjelper trenere å skape trygge, inkluderende og utviklende idrettsmiljø.
          </HeroSubtitle>
        )}
        
        <HeroActions>
          <Button href="/trenerhanda" variant="secondary" size="lg">
            Kom i gang
            <Icon icon="arrowRight" size={18} />
          </Button>
          <Button href="/handboka" variant="secondary" size="lg">
            Utforsk Håndbok
          </Button>
        </HeroActions>
      </HeroSection>

      {landingPageImages.length > 0 && (
        <section className="py-10 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {landingPageImages.map((item: { image?: unknown; alt?: string }, index: number) => {
                const imageUrl = item.image ? buildImageUrl(item.image, 1400) : null;

                if (!imageUrl) return null;

                return (
                  <div
                    key={`${imageUrl}-${index}`}
                    className="relative overflow-hidden rounded-3xl border border-[var(--current-theme-color-200)]/60 shadow-[var(--shadow-card)] aspect-[16/10] bg-white/70"
                  >
                    <Image
                      src={imageUrl}
                      alt={item.alt || "Landingsside bilde"}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section Cards */}
      <section className="py-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--current-theme-color-900)] tracking-tight">
            {siteSettings?.sectionCardsTitle || "Velg din vei inn"}
          </h2>
          <p className="mt-3 text-lg ">
            {siteSettings?.sectionCardsSubtitle || "To innganger til samme mål: et trygt og inkluderende idrettsmiljø"}
          </p>
        </div>

        {mainSections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto stagger-children">
            {mainSections.map((section: { _id: string; title: string; tagline?: string; description?: string; icon?: unknown; themeColor?: string; slug: { current: string } }) => (
              <SectionCard
                key={section._id}
                title={section.title}
                tagline={section.tagline}
                description={section.description}
                icon={section.icon}
                themeColor={section.themeColor}
                href={`/${section.slug.current}`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto stagger-children">
            <SectionCard
              title="Trenerhånda"
              tagline="Et praktisk verktøy"
              description="For trenere som vil jobbe mer systematisk med kulturen på laget."
              href="/trenerhanda"
              themeColor="krikkand-400"
            />
            <SectionCard
              title="Håndboka"
              tagline="Ressursbank"
              description="Filmer, aktiviteter og leker, klare til bruk!"
              href="/handboka"
              themeColor="mose-400"
            />
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-20 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(siteSettings?.featureBoxes && siteSettings.featureBoxes.length > 0) ? (
            siteSettings.featureBoxes.map((feature: { _key: string; icon?: string; title: string; description: string }, index: number) => (
              <FeatureItem
                key={feature._key}
                icon={feature.icon || "star"}
                title={feature.title}
                description={feature.description}
                delay={index}
              />
            ))
          ) : (
            <>
              <FeatureItem
                icon="book"
                title="Kunnskapsbasert"
                description="Bygget på forskning om positiv ungdomsutvikling og styrkebasert tenkning."
                delay={0}
              />
              <FeatureItem
                icon="users"
                title="For alle trenere"
                description="Uansett idrett, nivå eller erfaring – verktøy som virker i praksis."
                delay={1}
              />
              <FeatureItem
                icon="lightbulb"
                title="Lett tilgjengelig"
                description="Korte videoer, klare tips og konkrete aktiviteter du kan bruke med en gang."
                delay={2}
              />
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

function FeatureItem({ 
  icon, 
  title, 
  description,
  delay = 0,
}: { 
  icon: string; 
  title: string; 
  description: string;
  delay?: number;
}) {
  return (
    <div 
      className="group text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-[var(--current-theme-color-200)]/50 transition-all duration-300 hover:bg-white/80 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
      style={{ animationDelay: `${0.6 + delay * 0.1}s` }}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--current-theme-color-200)] mb-5 transition-transform duration-300 group-hover:scale-110">
        <Icon icon={icon} size={26} strokeWidth={1.5} className="" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--current-theme-color-900)] mb-2 tracking-tight">{title}</h3>
      <p className="text-sm  leading-relaxed">{description}</p>
    </div>
  );
}
