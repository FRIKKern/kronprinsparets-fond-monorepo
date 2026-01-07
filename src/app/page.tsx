import { client } from "@/lib/sanity";
import {
  LANDING_PAGE_QUERY,
  ALL_GROUPS_QUERY,
  ALL_KOMMUNER_QUERY,
} from "@/lib/queries";
import { Layout } from "@/components/Layout";
import { KommuneSearch } from "@/components/KommuneSearch";
import { CircleImages } from "@/components/CircleImages";
import { BlockContent } from "@/components/BlockContent";
import { Quote } from "@/components/Quote";
import { Subtitle1 } from "@/components/Typography";
import { getPageColor, mutateKommuneList } from "@/lib/helpers";
import Link from "next/link";

async function getLandingPageData() {
  const [landingPage, groups, kommuner] = await Promise.all([
    client.fetch(LANDING_PAGE_QUERY),
    client.fetch(ALL_GROUPS_QUERY),
    client.fetch(ALL_KOMMUNER_QUERY),
  ]);

  const kommuneList = mutateKommuneList(kommuner, groups);
  return { landingPage, kommuneList };
}

export default async function HomePage() {
  const { landingPage, kommuneList } = await getLandingPageData();
  const themeColor = getPageColor("/");

  const {
    title,
    search,
    topImages,
    importantMessage,
    text1,
    firstImage,
    quote1,
    text2,
    bottomImages,
    quote2,
    text3,
  } = landingPage;

  return (
    <Layout themeColor={themeColor}>
      <header className="relative min-h-[calc(90vh-var(--nav-height))] px-[var(--page-horizontal-padding)] pt-[10%] lg:grid lg:grid-cols-[400px_1fr] lg:items-center lg:gap-32 lg:pl-[15%] lg:pt-0">
        <div className="max-w-[400px]">
          <Subtitle1 className="mb-8">{title}</Subtitle1>
          <KommuneSearch searchData={search} kommuneList={kommuneList} />
        </div>
        <CircleImages images={topImages} layout={1} />
      </header>

      <section className="relative bg-[var(--current-theme-color-300)] px-[var(--page-horizontal-padding)] pb-24">
        {importantMessage?.showImportantMessage && (
          <div className="relative -top-4 bg-[var(--current-theme-color-200)] p-8 rounded max-w-[800px] mx-auto">
            <Subtitle1>{importantMessage.importantMessageTitle}</Subtitle1>
            <BlockContent blocks={importantMessage.importantMessage} />
            <Link
              href={importantMessage.link.href}
              className="inline-block mt-4 underline"
            >
              {importantMessage.link.name}
            </Link>
          </div>
        )}

        <div className="max-w-[800px] mx-auto py-[10%]">
          <BlockContent blocks={text1} />
        </div>

        <div className="relative lg:my-16 lg:mb-40">
          <div className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-[55%] lg:w-[40%]">
            <CircleImages images={firstImage} layout={2} />
          </div>
          <div className="max-w-[800px] mx-auto">
            <div className="lg:ml-auto lg:max-w-[400px]">
              <Quote {...quote1} />
            </div>
          </div>
        </div>

        <div className="max-w-[800px] mx-auto py-[10%]">
          <BlockContent blocks={text2} />
          <div className="my-8">
            <Quote {...quote2} />
          </div>
          <CircleImages images={bottomImages} layout={3} />
          <div className="mt-8">
            <BlockContent blocks={text3} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
