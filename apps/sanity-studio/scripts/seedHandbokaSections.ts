import { client, findOrCreateDocument } from "./sanityClient";

export async function seedHandbokaSections() {
  console.log("🌱 Seeding Handboka Subsections...");

  // First, get the Handboka section ID
  const handboka = await client.fetch(
    `*[_type == "section" && slug.current == "handboka"][0]{ _id }`
  );

  if (!handboka?._id) {
    console.error("❌ Handboka section not found. Run seedSections first.");
    return {};
  }

  const handbokaId = handboka._id;
  console.log(`📁 Found Handboka section: ${handbokaId}`);

  const subsections = [
    {
      _type: "section",
      title: "Filmer",
      slug: { current: "filmer" },
      tagline: "Temafilmer og forklaringsvideoer",
      description: "Se korte filmer som gir deg grunnleggende forståelse for FLYT-metodikken.",
      iconName: "play",
      sectionType: "content",
      showSidebar: true,
      themeColor: "mose-400",
      order: 1,
      parentSection: { _type: "reference", _ref: handbokaId },
    },
    {
      _type: "section",
      title: "Styrkebasert tenkesett",
      slug: { current: "styrkebasert-tenkesett" },
      tagline: "Se ressursene, ikke problemene",
      description: "Lær hvordan du kan fokusere på styrkene til barna for å skape vekst og utvikling.",
      iconName: "star",
      sectionType: "content",
      showSidebar: true,
      themeColor: "mose-400",
      order: 2,
      parentSection: { _type: "reference", _ref: handbokaId },
      content: [
        {
          _type: "block",
          _key: "sb1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "sbs1",
              text: "For å kunne hjelpe ungdommene og de voksne å fokusere på egne og andres styrker, bruker vi en rekke styrkebaserte verktøy. Slik får vi et felles språk som vi bruker for å finne fram til, og sette ord på, egne og andres gode egenskaper.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "sb2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "sbs2",
              text: "STYRKER",
              marks: ["strong"],
            },
          ],
        },
        {
          _type: "block",
          _key: "sb3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "sbs3",
              text: "STYRKER er gode egenskaper. I dette initiativet løfter vi fram styrkene mot, kreativitet, sosial kompetanse, samarbeid og livslyst og engasjement. De er 5 av de 24 styrkene til VIA Institute on character.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "section",
      title: "Anerkjennende kommunikasjon",
      slug: { current: "anerkjennende-kommunikasjon" },
      tagline: "Kommuniser med respekt og varme",
      description: "Verktøy for å bygge tillit og trygghet gjennom måten du snakker på.",
      iconName: "heart",
      sectionType: "content",
      showSidebar: true,
      themeColor: "mose-400",
      order: 3,
      parentSection: { _type: "reference", _ref: handbokaId },
      content: [
        {
          _type: "block",
          _key: "ak1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "aks1",
              text: "Anerkjennende kommunikasjon handler om å se, høre og respektere hvert barn. Det er en måte å snakke sammen på der man systematisk setter fokus på styrker, det som fungerer og det som er positivt.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "section",
      title: "Aktiviteter",
      slug: { current: "aktiviteter" },
      tagline: "Praktiske øvelser for trening",
      description: "Aktiviteter som styrker samarbeid, vennskap, selvfølelse og kommunikasjon.",
      iconName: "users",
      sectionType: "category",
      showSidebar: true,
      themeColor: "mose-400",
      order: 4,
      parentSection: { _type: "reference", _ref: handbokaId },
    },
    {
      _type: "section",
      title: "Lekebank",
      slug: { current: "lekebank" },
      tagline: "Leker for alle anledninger",
      description: "En samling av leker som skaper glede og fellesskap.",
      iconName: "lightbulb",
      sectionType: "content",
      showSidebar: true,
      themeColor: "mose-400",
      order: 5,
      parentSection: { _type: "reference", _ref: handbokaId },
    },
    {
      _type: "section",
      title: "Foreldre",
      slug: { current: "foreldre" },
      tagline: "Informasjon til foreldre",
      description: "Ressurser og informasjon du kan dele med foreldrene til barna du trener.",
      iconName: "users",
      sectionType: "content",
      showSidebar: true,
      themeColor: "bever-200",
      order: 6,
      parentSection: { _type: "reference", _ref: handbokaId },
      content: [
        {
          _type: "block",
          _key: "fo1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "fos1",
              text: "Her finner du informasjon og ressurser du kan dele med foreldrene til barna du trener. God kommunikasjon med hjemmet er viktig for å skape en trygg og god opplevelse for barna.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "section",
      title: "Spørsmål og svar",
      slug: { current: "sporsmal-og-svar" },
      tagline: "Vanlige spørsmål",
      description: "Svar på de vanligste spørsmålene om FLYT Idrett og metodikken.",
      iconName: "help-circle",
      sectionType: "content",
      showSidebar: true,
      themeColor: "mose-400",
      order: 7,
      parentSection: { _type: "reference", _ref: handbokaId },
    },
  ];

  const sectionIds: Record<string, string> = {};
  const childRefs: Array<{ _type: string; _ref: string; _key: string }> = [];

  for (const section of subsections) {
    const id = await findOrCreateDocument(
      "section",
      `slug.current == "${section.slug.current}"`,
      section
    );
    sectionIds[section.slug.current] = id;
    childRefs.push({ 
      _type: "reference", 
      _ref: id, 
      _key: `child-${section.slug.current}` 
    });
  }

  // Update Handboka to include these as children
  try {
    await client
      .patch(handbokaId)
      .set({ children: childRefs })
      .commit();
    console.log("✅ Updated Handboka with children references");
  } catch (error) {
    console.error("❌ Failed to update Handboka children:", error);
  }

  console.log("✅ Handboka subsections seeded");
  return sectionIds;
}

// Run directly
seedHandbokaSections()
  .then(() => {
    console.log("✅ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });

