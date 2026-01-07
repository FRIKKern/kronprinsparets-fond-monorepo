import { client } from "@/lib/sanity";
import { NAV_QUERY } from "@/lib/queries";
import { NavClient } from "./NavClient";

async function getNavData() {
  return await client.fetch(NAV_QUERY);
}

export async function Nav() {
  const navData = await getNavData();

  const sanityDocumentIdToSlug = (id: string | undefined): string | undefined => {
    if (!id) return undefined;
    
    const mapping: Record<string, string> = {
      "flyt-theoryOverview": "/teori",
      "drafts.flyt-theoryOverview": "/teori",
      "flyt-partners": "/partnere",
      "drafts.flyt-partners": "/partnere",
      "flyt-contactPage": "/kontakt",
      "drafts.flyt-contactPage": "/kontakt",
      "omFlyt": "/om-flyt",
      "drafts.omFlyt": "/om-flyt",
    };
    
    return mapping[id];
  };

  const navigationItems =
    navData?.navigationItems
      ?.map((item: any) => {
        // Match Gatsby logic: use href if it exists, otherwise use ID to slug mapping
        const href = item.href || sanityDocumentIdToSlug(item._id);
        const name = item.href ? item.name : item.title;

        // Only include items that have both href and name
        if (!href || !name) {
          return null;
        }

        return { href, name };
      })
      .filter((item: any) => item !== null) || [];

  return <NavClient navigationItems={navigationItems} />;
}

