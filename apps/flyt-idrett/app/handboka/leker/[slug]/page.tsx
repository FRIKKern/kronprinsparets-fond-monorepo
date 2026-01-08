import { client } from "@/lib/sanity";
import { GAME_QUERY, ALL_GAMES_QUERY } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VideoPlayer } from "@/components/VideoPlayer";
import { PdfDownload } from "@/components/PdfDownload";
import { PrevNextNav } from "@/components/PrevNextNav";
import { DecorativeShapes } from "@/components/DecorativeShapes";
import { Icon } from "@/components/Icon";
import { BlockContent } from "@kpf/ui";
import { Heading1, Body1 } from "@kpf/ui";
import { notFound } from "next/navigation";

async function getGameData(slug: string) {
  const game = await client.fetch(GAME_QUERY, { slug });
  if (!game) return null;

  const allGames = await client.fetch(ALL_GAMES_QUERY);
  type Game = { _id: string; slug?: { current: string } };
  const currentIndex = allGames.findIndex((g: Game) => g._id === game._id);
  const prev = currentIndex > 0 ? allGames[currentIndex - 1] : null;
  const next = currentIndex < allGames.length - 1 ? allGames[currentIndex + 1] : null;

  return { game, prev, next };
}

export const revalidate = 30;

export default async function GamePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  if (!slug) {
    notFound();
  }

  const data = await getGameData(slug);

  if (!data) {
    notFound();
  }

  const { game, prev, next } = data;

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Håndboka", href: "/handboka" },
          { label: "Leker", href: "/handboka/leker" },
          { label: game.title },
        ]}
      />

      {/* Video */}
      {game.videoUrl && (
        <div className="animate-fade-in-up mb-8">
          <VideoPlayer url={game.videoUrl} title={game.title} />
        </div>
      )}

      {/* Header */}
      <header className="relative mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <DecorativeShapes variant="minimal" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[var(--current-theme-color-300)] flex items-center justify-center">
              <Icon icon="play" size={18} className="" />
            </div>
            <span className="text-sm font-medium text-[var(--current-theme-color-800)] uppercase tracking-wide">
              Lek
            </span>
          </div>
          <Heading1 className="text-[var(--current-theme-color-900)]">{game.title}</Heading1>
        </div>
      </header>

      {/* Description */}
      {game.description && (
        <article className="prose-lg mb-10 p-6 rounded-xl bg-[var(--current-theme-color-200)]/50 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <BlockContent blocks={game.description} />
        </article>
      )}

      {/* Tips box */}
      <div 
        className="mb-8 p-5 rounded-xl bg-[var(--current-theme-color-200)] animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--current-theme-color-300)] flex items-center justify-center flex-shrink-0">
            <Icon icon="lightbulb" size={16} className="" />
          </div>
          <div>
            <Body1 className="font-semibold mb-1">Tips</Body1>
            <Body1 className="text-sm text-[var(--current-theme-color-800)]">
              Lekene er enkle og trenger lite forklaring. Prøv å la barna selv finne ut av reglene – det skaper engasjement!
            </Body1>
          </div>
        </div>
      </div>

      {/* PDF Download */}
      <div className="mb-8" style={{ animationDelay: "0.35s" }}>
        <PdfDownload 
          pdfFile={game.pdfFile}
          title="Last ned PDF"
          description="Full dokumentasjon for denne leken"
        />
      </div>

      {/* Navigation */}
      <PrevNextNav
        prevHref={prev ? `/handboka/leker/${prev.slug.current}` : undefined}
        prevLabel={prev?.title}
        nextHref={next ? `/handboka/leker/${next.slug.current}` : undefined}
        nextLabel={next?.title}
        backHref="/handboka/leker"
        backLabel="Alle leker"
      />
    </>
  );
}
