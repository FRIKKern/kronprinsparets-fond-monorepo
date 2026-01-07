import { client } from "@/lib/sanity";
import { THEORY_OVERVIEW_QUERY, ALL_THEORY_PAGES_QUERY } from "@/lib/queries";
import { Layout } from "@/components/Layout";
import { Heading1 } from "@/components/Typography";
import { TheoryThumbnail } from "@/components/TheoryThumbnail";
import { getPageColor } from "@/lib/helpers";
import styles from "./TheoryPages.module.css";

async function getTheoryOverview() {
  const [overview, allPages] = await Promise.all([
    client.fetch(THEORY_OVERVIEW_QUERY).catch(() => null),
    client.fetch(ALL_THEORY_PAGES_QUERY),
  ]);
  
  if (overview && overview.theoryPages) {
    return overview;
  }
  
  // Fallback: use all pages as thumbnails
  return {
    title: "Teori",
    theoryPages: allPages.map((page: any) => ({
      _key: page._id,
      title: page.title,
      description: page.description,
      slug: { current: page.slug },
    })),
  };
}

export default async function TheoryPage() {
  const data = await getTheoryOverview();
  const themeColor = getPageColor("/teori");

  return (
    <Layout themeColor={themeColor} standardPadding maxWidth>
      <Heading1>{data.title || "Teori"}</Heading1>
      <br />
      <div className={styles.theoryThumbnailGrid}>
        {data.theoryPages?.map((theoryThumbnail: any, index: number) => (
          <TheoryThumbnail
            key={`theory-page-${index}`}
            {...theoryThumbnail}
          />
        ))}
      </div>
    </Layout>
  );
}

