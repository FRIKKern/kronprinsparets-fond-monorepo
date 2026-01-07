import { client } from "@/lib/sanity";
import { SECTION_QUERY } from "@/lib/queries";
import { TrenerhandaSidebarClient } from "@/components/TrenerhandaSidebarClient";
import { Layout } from "@/components/Layout";
import { getPageColor } from "@/lib/helpers";

async function getTrenerhandaData() {
  const section = await client.fetch(SECTION_QUERY, { slug: "trenerhanda" });
  return section;
}

export default async function TrenerhandaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const section = await getTrenerhandaData();
  
  const themeColor = section?.themeColor
    ? getPageColor("", section.themeColor)
    : getPageColor("/trenerhanda");

  const lessons = section?.children?.filter((child: { _type: string }) => child._type === "lesson") || [];

  return (
    <Layout themeColor={themeColor} standardPadding maxWidth>
      <div className="flex flex-col md:flex-row gap-8">
        <TrenerhandaSidebarClient lessons={lessons} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </Layout>
  );
}

