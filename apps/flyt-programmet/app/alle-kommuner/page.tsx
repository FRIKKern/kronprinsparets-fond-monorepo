import { client } from "@/lib/sanity";
import { ALL_GROUPS_QUERY, ALL_KOMMUNER_QUERY } from "@/lib/queries";
import { Layout } from "@/components/Layout";
import { SearchListItem } from "@/components/SearchListItem";
import { Heading5 } from "@/components/Typography";
import { mutateKommuneList } from "@/lib/helpers";
import { getPageColor } from "@/lib/helpers";

async function getAllKommunerData() {
  const [groups, kommuner] = await Promise.all([
    client.fetch(ALL_GROUPS_QUERY),
    client.fetch(ALL_KOMMUNER_QUERY),
  ]);

  const kommuneList = mutateKommuneList(kommuner, groups).filter(
    (kommune) => kommune.groupUrl
  );

  return kommuneList;
}

export default async function AllKommunerPage() {
  const kommuner = await getAllKommunerData();
  const themeColor = getPageColor("/alle-kommuner");

  return (
    <Layout themeColor={themeColor} standardPadding maxWidth>
      <Heading5>Alle FLYT-kommuner</Heading5>
      <ul className="list-none p-0 mt-6">
        {kommuner
          .filter((kommune) => kommune.name)
          .sort((kommuneA, kommuneB) =>
            kommuneA.name.localeCompare(kommuneB.name)
          )
          .map((kommune, index) => (
            <SearchListItem kommune={kommune} key={`kommune-${index}`} />
          ))}
      </ul>
    </Layout>
  );
}

