import { client } from "@/lib/sanity";
import { PARTNERS_QUERY, PARTNERS_FALLBACK_QUERY, PARTNERS_FALLBACK2_QUERY } from "@/lib/queries";
import { Layout } from "@/components/Layout";
import { BlockContent } from "@/components/BlockContent";
import { Heading1 } from "@/components/Typography";
import { getPageColor } from "@/lib/helpers";

async function getPartnersData() {
  // Try primary query first (with mainPage filter)
  let data = await client.fetch(PARTNERS_QUERY);
  
  // If not found, try fallback 1 (without mainPage filter)
  if (!data) {
    data = await client.fetch(PARTNERS_FALLBACK_QUERY);
  }
  
  // If still not found, try fallback 2 (by _id)
  if (!data) {
    data = await client.fetch(PARTNERS_FALLBACK2_QUERY);
  }
  
  return data;
}

export default async function PartnersPage() {
  const data = await getPartnersData();
  const themeColor = getPageColor("/partnere");

  if (!data) {
    return (
      <Layout themeColor={themeColor} standardPadding maxWidth>
        <Heading1>Partnere</Heading1>
        <p>Kunne ikke laste inn innhold.</p>
      </Layout>
    );
  }

  return (
    <Layout themeColor={themeColor} standardPadding maxWidth>
      <Heading1>{data.title}</Heading1>
      <br />
      {data.content && <BlockContent blocks={data.content} />}
    </Layout>
  );
}

