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
      // Section cards heading
      sectionCardsTitle: "Velg din vei inn",
      sectionCardsSubtitle: "To innganger til samme mål: et trygt og inkluderende idrettsmiljø",
      // Feature boxes
      featureBoxes: [
        {
          _type: "featureBox",
          _key: "feature1",
          icon: "book",
          title: "Kunnskapsbasert",
          description: "Bygget på forskning om positiv ungdomsutvikling og styrkebasert tenkning.",
        },
        {
          _type: "featureBox",
          _key: "feature2",
          icon: "users",
          title: "For alle trenere",
          description: "Uansett idrett, nivå eller erfaring – verktøy som virker i praksis.",
        },
        {
          _type: "featureBox",
          _key: "feature3",
          icon: "lightbulb",
          title: "Lett tilgjengelig",
          description: "Korte videoer, klare tips og konkrete aktiviteter du kan bruke med en gang.",
        },
      ],
      // Footer contact info
      footerContactLabel: "Kontaktperson:",
      footerContactName: "Silje Mørtvedt",
      footerContactEmail: "silje@kppfond.no",
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

  // Update existing siteSettings with new fields if they don't exist
  try {
    await client
      .patch("siteSettings")
      .setIfMissing({
        sectionCardsTitle: "Velg din vei inn",
        sectionCardsSubtitle: "To innganger til samme mål: et trygt og inkluderende idrettsmiljø",
        featureBoxes: [
          {
            _type: "featureBox",
            _key: "feature1",
            icon: "book",
            title: "Kunnskapsbasert",
            description: "Bygget på forskning om positiv ungdomsutvikling og styrkebasert tenkning.",
          },
          {
            _type: "featureBox",
            _key: "feature2",
            icon: "users",
            title: "For alle trenere",
            description: "Uansett idrett, nivå eller erfaring – verktøy som virker i praksis.",
          },
          {
            _type: "featureBox",
            _key: "feature3",
            icon: "lightbulb",
            title: "Lett tilgjengelig",
            description: "Korte videoer, klare tips og konkrete aktiviteter du kan bruke med en gang.",
          },
        ],
        footerContactLabel: "Kontaktperson:",
        footerContactName: "Silje Mørtvedt",
        footerContactEmail: "silje@kppfond.no",
      })
      .commit();
    console.log("✅ Updated siteSettings with feature boxes and footer");
  } catch {
    console.log("⚠️  Could not update feature boxes and footer (may already be set)");
  }

  console.log("✅ Site Settings seeded");
  return siteSettings;
}

// Run if called directly
if (require.main === module) {
  seedSiteSettings()
    .then(() => {
      console.log("🎉 Done!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Error:", error);
      process.exit(1);
    });
}

