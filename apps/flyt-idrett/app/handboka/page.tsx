import { client } from "@/lib/sanity";
import { SECTION_QUERY, HANDBOKA_NAV_QUERY } from "@/lib/queries";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import Link from "next/link";

async function getHandbokaData() {
  const [section, navData] = await Promise.all([
    client.fetch(SECTION_QUERY, { slug: "handboka" }),
    client.fetch(HANDBOKA_NAV_QUERY),
  ]);
  return { section, subsections: navData?.sections || [] };
}

// Map section slugs to their URL paths
function getSectionHref(slug: string): string {
  const directRoutes: Record<string, string> = {
    "filmer": "/handboka/filmer",
    "styrkebasert-tenkesett": "/handboka/styrkebasert-tenkesett",
    "anerkjennende-kommunikasjon": "/handboka/anerkjennende-kommunikasjon",
    "aktiviteter": "/handboka/aktiviteter",
    "lekebank": "/handboka/lekebank",
    "foreldre": "/handboka/foreldre",
    "sporsmal-og-svar": "/handboka/sporsmal-og-svar",
  };
  
  return directRoutes[slug] || `/handboka/${slug}`;
}

export default async function HandbokaPage() {
  const { section, subsections } = await getHandbokaData();

  if (!section) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <h1 className="text-4xl font-bold text-[var(--current-theme-color-900)] tracking-tight">Håndboka</h1>
        <p className="mt-4 text-lg ">Innhold kommer snart...</p>
        <div className="mt-10">
          <Button href="/" variant="secondary">
            <Icon icon="arrowRight" size={16} className="rotate-180" />
            Tilbake til forsiden
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      {/* <div className="mb-8 animate-fade-in">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm  hover:text-[var(--current-theme-color-900)] transition-colors link-underline"
        >
          <Icon icon="arrowRight" size={14} className="rotate-180" />
          Tilbake til forsiden
        </Link>
      </div> */}

      {/* Header */}
      <header className="mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--current-theme-color-900)] tracking-tight">
          {section.title}
        </h1>
        {section.tagline && (
          <p className="mt-3 text-xl font-medium">
            {section.tagline}
          </p>
        )}
        {section.description && (
          <p className="mt-4 max-w-2xl text-lg  leading-relaxed">
            {section.description}
          </p>
        )}
      </header>

      {/* Content Sections Grid */}
      {subsections && subsections.length > 0 && (
        <section className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <h2 className="text-xs font-semibold text-[var(--current-theme-color-800)] uppercase tracking-widest mb-6">
            Innhold
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subsections.map((item: {
              _id: string;
              title: string;
              slug: { current: string };
              tagline?: string;
              description?: string;
              iconName?: string;
            }, index: number) => (
              <ContentSectionCard
                key={item._id}
                title={item.title}
                tagline={item.tagline || ""}
                description={item.description || ""}
                iconName={item.iconName || "book"}
                href={getSectionHref(item.slug.current)}
                index={index}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function ContentSectionCard({ 
  title, 
  tagline, 
  description, 
  iconName, 
  href,
  index = 0,
}: { 
  title: string; 
  tagline: string; 
  description: string; 
  iconName: string; 
  href: string;
  index?: number;
}) {
  return (
    <Link
      href={href}
      className="group relative block p-6 rounded-xl overflow-hidden bg-white/95 backdrop-blur-sm shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 ease-out no-underline border border-[var(--current-theme-color-200)]/50 animate-fade-in-up"
      style={{ animationDelay: `${0.2 + index * 0.05}s` }}
    >
      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[var(--current-theme-color-100)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Icon icon={iconName} size={22} strokeWidth={1.5} className="" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-[var(--current-theme-color-900)] tracking-tight">
              {title}
            </h3>
            {tagline && (
              <p className="text-sm  font-medium">
                {tagline}
              </p>
            )}
          </div>
          
          <span className="flex-shrink-0 transition-all duration-300 group-hover:translate-x-1.5">
            <Icon 
              icon="arrowRight" 
              size={18} 
              className="text-[var(--current-theme-color-700)] transition-colors duration-300 group-hover:" 
            />
          </span>
        </div>
        
        {description && (
          <p className="mt-3 text-sm text-[var(--current-theme-color-800)] leading-relaxed">
            {description}
          </p>
        )}
      </div>
      
      {/* Elegant left border accent */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--current-theme-color-400)] to-[var(--current-theme-color-500)] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
      />
    </Link>
  );
}
