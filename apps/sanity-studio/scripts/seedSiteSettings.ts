import { client, findOrCreateDocument } from "./sanityClient";

export async function seedSiteSettings(sectionIds?: Record<string, string>) {
  console.log("🌱 Seeding Site Settings...");

  const mainSections = sectionIds
    ? [
        { _type: "reference", _ref: sectionIds["trenerhanda"] },
        { _type: "reference", _ref: sectionIds["handboka"] },
      ].filter((ref) => ref._ref) // Filter out undefined references
    : [];

  const siteSettings = await findOrCreateDocument(
    "siteSettings",
    '_id == "siteSettings"',
    {
      _id: "siteSettings",
      _type: "siteSettings",
      siteTitle: "FLYT Idrett",
      siteDescription: "Digital kulturplattform som hjelper trenere å skape trygge, inkluderende og utviklende idrettsmiljø.",
      landingPageIntro: [
        {
          _type: "block",
          _key: "intro1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Velkommen til FLYT Idrett – en digital plattform som hjelper trenere å skape trygge, inkluderende og utviklende idrettsmiljø.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "intro2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "Her finner du praktiske verktøy og kunnskap for å styrke samarbeid, vennskap, selvfølelse og kommunikasjon i idrettsmiljøet.",
              marks: [],
            },
          ],
        },
      ],
      mainSections,
    }
  );

  // If sections were provided but not set initially, update now
  if (sectionIds && mainSections.length === 2) {
    try {
      await client
        .patch("siteSettings")
        .set({ mainSections })
        .commit();
      console.log("✅ Updated siteSettings with main sections");
    } catch {
      console.log("⚠️  Could not update mainSections (may already be set)");
    }
  }

  console.log("✅ Site Settings seeded");
  return siteSettings;
}

