import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { ALL_THEORY_PAGES_QUERY } from "@/lib/queries";
import { Layout } from "@/components/Layout";
import { BlockContent } from "@/components/BlockContent";
import { Heading1 } from "@/components/Typography";
import { getPageColor } from "@/lib/helpers";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const pages = await client.fetch(ALL_THEORY_PAGES_QUERY);
  return pages.map((page: any) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const pages = await client.fetch(ALL_THEORY_PAGES_QUERY);
  const page = pages.find((p: any) => p.slug === slug);
  return { title: page?.title || "Teori" };
}

export default async function TheoryDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const pages = await client.fetch(ALL_THEORY_PAGES_QUERY);
  const page = pages.find((p: any) => p.slug === slug);

  if (!page) notFound();

  const themeColor = getPageColor("/teori/detail");

  return (
    <Layout themeColor={themeColor}>
      <div className="max-w-[800px] mx-auto px-[var(--page-horizontal-padding)] py-20">
        <Heading1>{page.title}</Heading1>
        {page.content && <BlockContent blocks={page.content} />}
      </div>
    </Layout>
  );
}

