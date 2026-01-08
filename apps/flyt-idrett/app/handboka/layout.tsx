import { client } from "@/lib/sanity";
import { SECTION_QUERY, HANDBOKA_NAV_QUERY } from "@/lib/queries";
import { HandbokaSidebarClient } from "@/components/HandbokaSidebarClient";
import { Layout } from "@/components/Layout";
import { getPageColor } from "@/lib/helpers";

async function getHandbokaData() {
  const [section, navData] = await Promise.all([
    client.fetch(SECTION_QUERY, { slug: "handboka" }),
    client.fetch(HANDBOKA_NAV_QUERY),
  ]);
  return { section, navData };
}

export default async function HandbokaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { section, navData } = await getHandbokaData();
  
  const themeColor = getPageColor("", "mose-400");

  return (
    <Layout themeColor={themeColor} standardPadding maxWidth>
      <div className="flex flex-col md:flex-row gap-8">
        <HandbokaSidebarClient 
          sections={navData?.sections || []}
          activities={navData?.activities || []}
          games={navData?.games || []}
        />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </Layout>
  );
}
