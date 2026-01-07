import { client } from "@/lib/sanity";
import { SECTION_QUERY } from "@/lib/queries";
import { Icon } from "@/components/Icon";
import { VideoPlayer } from "@/components/VideoPlayer";
import { PdfDownload } from "@/components/PdfDownload";
import { Heading1, Body1, BlockContent } from "@kpf/ui";
import Link from "next/link";

async function getSectionData() {
  const section = await client.fetch(SECTION_QUERY, { slug: "foreldre" });
  return section;
}

export default async function ForeldrePage() {
  const section = await getSectionData();

  return (
    <>
      {/* Breadcrumb */}
      {/* <nav className="mb-6 animate-fade-in" aria-label="Brødsmulesti">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link 
              href="/handboka" 
              className=" hover:text-[var(--current-theme-color-900)] transition-colors"
            >
              Håndboka
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Icon icon="chevronRight" size={14} className="text-[var(--current-theme-color-500)]" />
            <span className="text-[var(--current-theme-color-900)] font-medium">
              {section?.title || "Foreldre"}
            </span>
          </li>
        </ol>
      </nav> */}

      {/* Header */}
      <header className="mb-10 animate-fade-in-up">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--current-theme-color-200)] flex items-center justify-center">
            <Icon icon={section?.iconName || "users"} size={28} strokeWidth={1.5} className="" />
          </div>
          <div>
            <Heading1 className="text-[var(--current-theme-color-900)]">
              {section?.title || "Foreldre"}
            </Heading1>
            {section?.tagline && (
              <p className="mt-2 text-xl ">
                {section.tagline}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Video */}
      {section?.videoUrl && (
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <VideoPlayer url={section.videoUrl} title={section.title} />
        </div>
      )}

      {/* Description */}
      {section?.description && (
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <p className="text-lg  leading-relaxed max-w-3xl">
            {section.description}
          </p>
        </div>
      )}

      {/* Content */}
      {section?.content ? (
        <article className="prose-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <BlockContent blocks={section.content} />
        </article>
      ) : (
        <div className="py-12 text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--current-theme-color-200)] mb-4">
            <Icon icon="users" size={28} className="text-[var(--current-theme-color-800)]" />
          </div>
          <Body1 className="">
            Innhold kommer snart.
          </Body1>
        </div>
      )}

      {/* PDF Download */}
      <div className="mt-10" style={{ animationDelay: "0.3s" }}>
        <PdfDownload 
          pdfFile={section?.pdfFile}
          title="Last ned foreldreinfo (PDF)"
          description="Del med foreldre i din gruppe"
        />
      </div>
    </>
  );
}
