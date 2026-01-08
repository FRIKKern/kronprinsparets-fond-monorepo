import { client } from "@/lib/sanity";
import { SECTION_QUERY } from "@/lib/queries";
import { LessonCard } from "@/components/LessonCard";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import Link from "next/link";

async function getTrenerhandaData() {
  const section = await client.fetch(SECTION_QUERY, { slug: "trenerhanda" });
  return section;
}

export const revalidate = 30;

export default async function TrenerhandaPage() {
  const section = await getTrenerhandaData();

  if (!section) {
    return (
      <div className="py-20 text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-[var(--current-theme-color-900)] tracking-tight">Trenerhånda</h1>
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

  const lessons = section.children?.filter((child: { _type: string }) => child._type === "lesson") || [];

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

      {/* Lessons Grid */}
      {lessons.length > 0 ? (
        <section className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xs font-semibold text-[var(--current-theme-color-800)] uppercase tracking-widest mb-6">
            Leksjoner ({lessons.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((lesson: { _id: string; title: string; subtitle?: string; slug: { current: string } }, index: number) => (
              <LessonCard
                key={lesson._id}
                title={lesson.title}
                subtitle={lesson.subtitle}
                href={`/trenerhanda/${lesson.slug.current}`}
                index={index}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="text-center py-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--current-theme-color-200)] mb-4">
            <Icon icon="book" size={28} className="text-[var(--current-theme-color-800)]" />
          </div>
          <p className="text-lg ">
            Ingen leksjoner tilgjengelig ennå.
          </p>
        </section>
      )}
    </>
  );
}
