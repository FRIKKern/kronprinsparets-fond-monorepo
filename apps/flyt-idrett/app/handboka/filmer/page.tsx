import { client } from "@/lib/sanity";
import { ALL_VIDEOS_QUERY, SECTION_QUERY } from "@/lib/queries";
import { VideoCard } from "@/components/VideoCard";
import { PdfDownload } from "@/components/PdfDownload";
import { DecorativeShapes } from "@/components/DecorativeShapes";
import { Icon } from "@/components/Icon";
import { Heading1, Body1 } from "@kpf/ui";

async function getFilmerData() {
  const [videos, section] = await Promise.all([
    client.fetch(ALL_VIDEOS_QUERY),
    client.fetch(SECTION_QUERY, { slug: "filmer" }),
  ]);
  return { videos: videos || [], section };
}

export const revalidate = 30;

export default async function FilmerPage() {
  const { videos, section } = await getFilmerData();

  type Video = {
    _id: string;
    title: string;
    category?: string;
    description?: string;
    videoUrl?: string;
  };

  // Group by category if available
  const categoryStrings: string[] = videos
    .map((v: Video) => v.category)
    .filter((cat: string | undefined): cat is string => typeof cat === "string" && cat.length > 0);
  const categories: string[] = Array.from(new Set(categoryStrings));
  const hasCategories = categories.length > 0;

  return (
    <>
      {/* Breadcrumbs */}
      {/* <Breadcrumbs
        items={[
          { label: "Håndboka", href: "/handboka" },
          { label: "Filmer" },
        ]}
      /> */}

      {/* Header */}
      <header className="relative py-8 mb-8">
        <DecorativeShapes variant="minimal" />
        <div className="relative z-10 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-xl bg-[var(--current-theme-color-300)] flex items-center justify-center shadow-sm">
              <Icon icon="play" size={28} className="" />
            </div>
            <div>
              <Heading1 className="text-[var(--current-theme-color-900)]">Filmer</Heading1>
              <Body1 className="text-[var(--current-theme-color-800)]">
                {videos.length} tematiske videoer
              </Body1>
            </div>
          </div>
          <Body1 className="mt-4 max-w-2xl ">
            Korte videoer som forklarer konsepter, demonstrerer aktiviteter og gir inspirasjon til treningen.
          </Body1>
        </div>
      </header>

      {/* Category filter */}
      {hasCategories && (
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {categories.map((category) => (
            <span
              key={category}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--current-theme-color-200)] text-sm font-medium "
            >
              {category}
            </span>
          ))}
        </div>
      )}

      {/* Videos Grid */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video: Video, index: number) => (
            <VideoCard
              key={video._id}
              id={video._id}
              title={video.title}
              description={video.description}
              videoUrl={video.videoUrl}
              category={video.category}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--current-theme-color-200)] mb-4">
            <Icon icon="play" size={32} className="text-[var(--current-theme-color-500)]" />
          </div>
          <Body1 className="text-[var(--current-theme-color-800)]">
            Ingen videoer tilgjengelig ennå.
          </Body1>
          <p className="mt-2 text-sm text-[var(--current-theme-color-500)]">
            Sjekk tilbake snart for nytt innhold.
          </p>
        </div>
      )}

      {/* PDF Download */}
      <div className="mt-10" style={{ animationDelay: "0.2s" }}>
        <PdfDownload 
          pdfFile={section?.pdfFile}
          title="Last ned PDF"
          description="Full dokumentasjon for Filmer-seksjonen"
        />
      </div>
    </>
  );
}
