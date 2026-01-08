import { client } from "@/lib/sanity";
import { LESSON_QUERY, SECTION_QUERY } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VideoPlayer } from "@/components/VideoPlayer";
import { CrossLinkCard } from "@/components/CrossLinkCard";
import { PdfDownloads } from "@/components/PdfDownload";
import { Icon } from "@/components/Icon";
import { PrevNextNav } from "@/components/PrevNextNav";
import { Heading1, Body1, BlockContent } from "@kpf/ui";
import { notFound } from "next/navigation";

async function getLessonData(slug: string) {
  const lesson = await client.fetch(LESSON_QUERY, { slug });
  const section = await client.fetch(SECTION_QUERY, { slug: "trenerhanda" });
  return { lesson, section };
}

export const revalidate = 30;

export default async function TrenerhandaLessonPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Handle both sync and async params (Next.js 15 compatibility)
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  if (!slug) {
    notFound();
  }

  const { lesson, section } = await getLessonData(slug);

  if (!lesson) {
    notFound();
  }

  const lessons = section?.children?.filter((child: { _type: string }) => child._type === "lesson") || [];
  const currentIndex = lessons.findIndex((l: { _id: string }) => l._id === lesson._id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Trenerhånda", href: "/trenerhanda" },
          { label: lesson.title },
        ]}
      />

      {/* Video Section */}
      {lesson.videoUrl && (
        <div className="animate-fade-in-up mb-10">
          <VideoPlayer url={lesson.videoUrl} title={lesson.title} />
        </div>
      )}

      {/* Header */}
      <header className="relative mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="relative z-10">
          <Heading1 className="text-[var(--current-theme-color-900)]">{lesson.title}</Heading1>
          {lesson.subtitle && (
            <p className="mt-3 text-xl  font-medium">
              {lesson.subtitle}
            </p>
          )}
        </div>
      </header>

      {/* Main Content */}
      {lesson.content && (
        <article className="prose-lg mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <BlockContent blocks={lesson.content} />
        </article>
      )}

      {/* Tips Box */}
      {lesson.tips && lesson.tips.length > 0 && (
        <div 
          className="mb-10 p-6 rounded-xl bg-[var(--current-theme-color-200)] shadow-[var(--shadow-card)] animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[var(--current-theme-color-300)] flex items-center justify-center">
              <Icon icon="lightbulb" size={18} className="" />
            </div>
            <Body1 className="font-semibold ">Tips for treneren</Body1>
          </div>
          <ul className="space-y-3">
            {lesson.tips.map((tip: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--current-theme-color-300)]  text-sm font-medium flex items-center justify-center">
                  {index + 1}
                </span>
                <Body1 className="">{tip}</Body1>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Content */}
      {lesson.relatedContent && lesson.relatedContent.length > 0 && (
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-sm font-semibold text-[var(--current-theme-color-800)] uppercase tracking-wide mb-4">
            Lær mer
          </h3>
          <div className="space-y-3">
            {lesson.relatedContent.map((related: { _id: string; title?: string; tagline?: string; slug?: { current: string } }) => (
              <CrossLinkCard
                key={related._id}
                title={related.title || "Les mer i Håndboka"}
                href={`/handboka/${related.slug?.current || ""}`}
                description={related.tagline || "Fordyp deg i temaet"}
              />
            ))}
          </div>
        </div>
      )}

      {/* PDF Download */}
      <div className="mb-10" style={{ animationDelay: "0.45s" }}>
        <PdfDownloads 
          pdfFiles={lesson.pdfFiles}
          pdfFile={lesson.pdfFile}
          title={lesson.pdfTitle}
          description={lesson.pdfDescription}
        />
      </div>

      {/* Navigation */}
      <PrevNextNav
        prevHref={prevLesson ? `/trenerhanda/${prevLesson.slug.current}` : undefined}
        prevLabel={prevLesson?.title}
        nextHref={nextLesson ? `/trenerhanda/${nextLesson.slug.current}` : undefined}
        nextLabel={nextLesson?.title}
        backHref="/trenerhanda"
        backLabel="Alle leksjoner"
      />
    </>
  );
}
