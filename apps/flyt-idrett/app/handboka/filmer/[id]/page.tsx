import { client } from "@/lib/sanity";
import { ALL_VIDEOS_QUERY, SECTION_QUERY } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VideoPlayer } from "@/components/VideoPlayer";
import { PdfDownload } from "@/components/PdfDownload";
import { PrevNextNav } from "@/components/PrevNextNav";
import { Heading1, Body1 } from "@kpf/ui";
import { notFound } from "next/navigation";

type Video = {
  _id: string;
  title: string;
  slug?: { current: string };
};

async function getVideoData(id: string) {
  const [allVideos, filmerSection] = await Promise.all([
    client.fetch(ALL_VIDEOS_QUERY),
    client.fetch(SECTION_QUERY, { slug: "filmer" }),
  ]);
  const video = allVideos.find((v: Video) => v._id === id);
  if (!video) return null;

  const currentIndex = allVideos.findIndex((v: Video) => v._id === id);
  const prev = currentIndex > 0 ? allVideos[currentIndex - 1] : null;
  const next = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null;

  return { video, prev, next, section: filmerSection };
}

export const revalidate = 30;

export default async function VideoPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const data = await getVideoData(resolvedParams.id);

  if (!data) {
    notFound();
  }

  const { video, prev, next, section } = data;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Håndboka", href: "/handboka" },
          { label: "Filmer", href: "/handboka/filmer" },
          { label: video.title },
        ]}
      />

      <VideoPlayer url={video.videoUrl} title={video.title} />

      <div className="mb-8">
        <Heading1>{video.title}</Heading1>
        {video.description && (
          <Body1 className="mt-2 ">{video.description}</Body1>
        )}
      </div>

      {/* PDF Download - video PDF or section PDF */}
      <div className="mb-8">
        <PdfDownload 
          pdfFile={video.pdfFile || section?.pdfFile}
          title="Last ned PDF"
          description={video.pdfFile ? "Full dokumentasjon for denne videoen" : "Full dokumentasjon"}
        />
      </div>

      <PrevNextNav
        prevHref={prev ? `/handboka/filmer/${prev._id}` : undefined}
        prevLabel={prev?.title}
        nextHref={next ? `/handboka/filmer/${next._id}` : undefined}
        nextLabel={next?.title}
        backHref="/handboka/filmer"
        backLabel="Alle filmer"
      />
    </>
  );
}

