import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { ALL_GROUPS_QUERY, ALL_EMPLOYEES_QUERY } from "@/lib/queries";
import { Layout } from "@/components/Layout";
import { GroupContent } from "@/components/GroupContent";
import { slugify, getPageColor } from "@/lib/helpers";

type Params = { kommune: string; year: string };

export async function generateStaticParams(): Promise<Params[]> {
  const groups = await client.fetch(ALL_GROUPS_QUERY);

  const params: Params[] = [];
  const groupsByKommune = new Map<string, Set<string>>();

  for (const group of groups) {
    if (!group.kommune?.name) continue;
    const kommuneSlug = slugify(group.kommune.name);
    const yearSlug = group.year.replace("/", "-");

    if (!groupsByKommune.has(kommuneSlug)) {
      groupsByKommune.set(kommuneSlug, new Set());
    }
    groupsByKommune.get(kommuneSlug)!.add(yearSlug);
  }

  for (const [kommune, years] of groupsByKommune) {
    for (const year of years) {
      params.push({ kommune, year });
    }
  }

  return params;
}

async function getGroupData(kommune: string, year: string) {
  const [groups, allEmployees] = await Promise.all([
    client.fetch(ALL_GROUPS_QUERY),
    client.fetch(ALL_EMPLOYEES_QUERY),
  ]);

  const yearFormatted = year.replace("-", "/");
  const kommuneName = groups.find(
    (g: any) => g.kommune?.name && slugify(g.kommune.name) === kommune
  )?.kommune?.name;

  if (!kommuneName) return null;

  const thisYearsGroups = groups
    .filter(
      (g: any) => g.kommune?.name === kommuneName && g.year === yearFormatted
    )
    .map((group: any) => {
      // Attach employees to group
      const employees = allEmployees
        .filter((emp: any) =>
          emp.stillinger?.some((s: any) => s.group?._id === group._id)
        )
        .map((emp: any) => ({
          ...emp,
          stilling: emp.stillinger.find((s: any) => s.group?._id === group._id),
        }));
      return { ...group, employees };
    });

  const allYears = [
    ...new Set(
      groups
        .filter((g: any) => g.kommune?.name === kommuneName)
        .map((g: any) => g.year)
    ),
  ];
  const otherYears = allYears.filter((y: string) => y !== yearFormatted);

  return { groups: thisYearsGroups, otherYears, kommuneName };
}

export default async function GroupPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { kommune, year } = await params;
  const data = await getGroupData(kommune, year);

  if (!data || data.groups.length === 0) {
    notFound();
  }

  const themeColor = getPageColor(`/${kommune}`);

  return (
    <Layout themeColor={themeColor} standardPadding maxWidth>
      <GroupContent
        groups={data.groups}
        otherYears={data.otherYears}
        kommuneName={data.kommuneName}
      />
    </Layout>
  );
}

