import { client } from "@/lib/sanity";
import { ACTIVITY_QUERY, ACTIVITIES_BY_CATEGORY_QUERY } from "@/lib/queries";
import { VideoPlayer } from "@/components/VideoPlayer";
import { MetadataChips } from "@/components/MetadataChips";
import { StepList } from "@/components/StepList";
import { ReflectionBox } from "@/components/ReflectionBox";
import { TipsList } from "@/components/TipsList";
import { PdfDownload } from "@/components/PdfDownload";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DecorativeShapes } from "@/components/DecorativeShapes";
import { Icon } from "@/components/Icon";
import { BlockContent } from "@kpf/ui";
import { Heading1, Body1 } from "@kpf/ui";
import { notFound } from "next/navigation";

async function getActivityData(slug: string) {
  const activity = await client.fetch(ACTIVITY_QUERY, { slug });
  if (!activity) return null;

  const categoryActivities = await client.fetch(ACTIVITIES_BY_CATEGORY_QUERY, {
    category: activity.category,
  });
  type Activity = { _id: string; slug?: { current: string } };
  const currentIndex = categoryActivities.findIndex((a: Activity) => a._id === activity._id);
  const prev = currentIndex > 0 ? categoryActivities[currentIndex - 1] : null;
  const next =
    currentIndex < categoryActivities.length - 1 ? categoryActivities[currentIndex + 1] : null;

  return { activity, prev, next };
}

export default async function ActivityPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  if (!slug) {
    notFound();
  }

  const data = await getActivityData(slug);

  if (!data) {
    notFound();
  }

  const { activity } = data;

  const categoryLabels: Record<string, string> = {
    samarbeid: "Samarbeid",
    vennskap: "Vennskap", 
    selvfolelse: "Selvfølelse",
    kommunikasjon: "Kommunikasjon",
  };

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Håndboka", href: "/handboka" },
          { label: "Aktiviteter", href: "/handboka/aktiviteter" },
          { label: activity.title },
        ]}
      />

      {/* Video */}
      {activity.videoUrl && (
        <div className="animate-fade-in-up mb-8">
          <VideoPlayer url={activity.videoUrl} title={activity.title} />
        </div>
      )}

      {/* Header */}
      <header className="relative mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <DecorativeShapes variant="minimal" />
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 mb-3">
            <Heading1 className="text-[var(--current-theme-color-900)]">{activity.title}</Heading1>
            <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--current-theme-color-300)] text-sm font-medium">
              <Icon icon="users" size={14} />
              {categoryLabels[activity.category] || activity.category}
            </span>
          </div>
          {activity.shortDescription && (
            <Body1 className="text-lg ">
              {activity.shortDescription}
            </Body1>
          )}
        </div>
      </header>

      {/* Metadata Chips */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
        <MetadataChips
          duration={activity.duration}
          purpose={activity.purpose}
          equipment={activity.equipment}
        />
      </div>

      {/* Steps */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <StepList steps={activity.steps} />
      </div>

      {/* Reflection */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <ReflectionBox question={activity.reflectionQuestion} />
      </div>

      {/* Variations */}
      {activity.variations && (
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-lg font-semibold mb-4">
            Variasjoner
          </h3>
          <div className="p-5 rounded-lg bg-[var(--current-theme-color-200)]/50">
            <BlockContent blocks={activity.variations} />
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
        <TipsList tips={activity.trainerTips} />
      </div>

      {/* PDF Download */}
      <div className="mb-8" style={{ animationDelay: "0.4s" }}>
        <PdfDownload 
          pdfFile={activity.pdfFile}
          title="Last ned PDF"
          description="Full dokumentasjon for denne aktiviteten"
        />
      </div>

      {/* Navigation */}
      {/* <PrevNextNav
        prevHref={prev ? `/handboka/aktiviteter/${prev.slug.current}` : undefined}
        prevLabel={prev?.title}
        nextHref={next ? `/handboka/aktiviteter/${next.slug.current}` : undefined}
        nextLabel={next?.title}
      /> */}
    </>
  );
}
