import { client } from "@/lib/sanity";
import { SITE_SETTINGS_QUERY } from "@/lib/queries";
import { NavClient } from "./NavClient";

async function getNavData() {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY);
  return siteSettings;
}

export async function Nav() {
  const siteSettings = await getNavData();

  // Build navigation from main sections
  const navigationItems =
    siteSettings?.mainSections
      ?.map((section: any) => {
        if (!section?.slug?.current || !section?.title) {
          return null;
        }
        return {
          href: `/${section.slug.current}`,
          name: section.title,
        };
      })
      .filter((item: any) => item !== null) || [];

  // Fallback to default navigation if no siteSettings
  if (navigationItems.length === 0) {
    navigationItems.push(
      { href: "/trenerhanda", name: "Trenerhånda" },
      { href: "/handboka", name: "Håndboka" }
    );
  }

  return <NavClient navigationItems={navigationItems} />;
}

