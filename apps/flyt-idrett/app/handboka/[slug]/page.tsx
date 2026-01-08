import { client } from "@/lib/sanity";
import { SECTION_QUERY } from "@/lib/queries";
import { VideoPlayer } from "@/components/VideoPlayer";
import { PdfDownloads } from "@/components/PdfDownload";
import { Heading1, Body1, BlockContent } from "@kpf/ui";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getSectionData(slug: string) {
  const section = await client.fetch(SECTION_QUERY, { slug });
  return section;
}

export const revalidate = 30;

export default async function HandbokaSectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const section = await getSectionData(params.slug);

  if (!section) {
    notFound();
  }

  return (
    <>
      <Link
        href="/handboka"
        className="inline-block mb-6 hover:underline"
      >
        ← Tilbake til Håndboka
      </Link>

      {section.videoUrl && <VideoPlayer url={section.videoUrl} title={section.title} />}

      <div className="mb-8">
        <Heading1>{section.title}</Heading1>
        {section.tagline && (
          <Body1 className="mt-2 ">{section.tagline}</Body1>
        )}
      </div>

      {section.content && <BlockContent blocks={section.content} />}

      <div className="mt-10">
        <PdfDownloads
          pdfFiles={section.pdfFiles}
          pdfFile={section.pdfFile}
          title={section.pdfTitle}
          description={section.pdfDescription}
        />
      </div>
    </>
  );
}
