import { client, findOrCreateDocument } from "./sanityClient";

export async function seedSections() {
  console.log("🌱 Seeding Sections...");

  const sections = [
    // Trenerhanda (main section)
    {
      _type: "section",
      title: "Trenerhanda",
      slug: { current: "trenerhanda" },
      tagline: "Hva gjør jeg her og nå?",
      description: "Praktiske tips for treneren på feltet",
      sectionType: "main",
      showSidebar: false,
      themeColor: "krikkand-400",
      order: 1,
    },
    // Handboka (main section)
    {
      _type: "section",
      title: "Håndboka",
      slug: { current: "handboka" },
      tagline: "Hvorfor gjør vi det sånn?",
      description: "Fordypning, forståelse, felles språk",
      sectionType: "main",
      showSidebar: true,
      themeColor: "mose-400",
      order: 2,
    },
    // Metodikk subsections
    {
      _type: "section",
      title: "Styrkebasert tenkesett",
      slug: { current: "styrkebasert-tenkesett" },
      tagline: "Se styrker først",
      description: "Grunnleggende prinsipper for styrkebasert tenkesett",
      sectionType: "content",
      showSidebar: true,
      themeColor: "mose-400",
      content: [
        {
          _type: "block",
          _key: "content1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "For å kunne hjelpe ungdommene og de voksne å fokusere på egne og andres styrker, bruker vi en rekke styrkebaserte verktøy. Slik får vi et felles språk som vi bruker for å finne fram til, og sette ord på, egne og andres gode egenskaper.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "content2",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "STYRKER",
              marks: ["strong"],
            },
          ],
        },
        {
          _type: "block",
          _key: "content3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span3",
              text: "STYRKER er gode egenskaper. I dette initiativet løfter vi fram styrkene mot, kreativitet, sosial kompetanse, samarbeid og livslyst og engasjement. De er 5 av de 24 styrkene til VIA Institute on character.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "content4",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span4",
              text: "STYRKEMERKER",
              marks: ["strong"],
            },
          ],
        },
        {
          _type: "block",
          _key: "content5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span5",
              text: "STYRKEMERKER er ulike klistremerker med de fem styrkene på. Ungdommene får tildelt klistremerker i noen spesifikke aktiviteter. De store klistremerkene klistres på overdelen til ungdommen og de små festes på ungdommens egen side i denne boka. Ungdommene får på denne måten et visuelt bevis på den enkeltes styrker.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "content6",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span6",
              text: "VEIKART",
              marks: ["strong"],
            },
          ],
        },
        {
          _type: "block",
          _key: "content7",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span7",
              text: "VEIKART er en metode vi bruker for å hjelpe ungdommene å se for seg sine egne og lagets drømmer og mål, og hvordan de kan jobbe for å nå dem. Slik trener vi på å se hvordan styrkene vi har kan brukes på laget.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "content8",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span8",
              text: "ANERKJENNENDE SAMTALER",
              marks: ["strong"],
            },
          ],
        },
        {
          _type: "block",
          _key: "content9",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span9",
              text: "ANERKJENNENDE SAMTALER er en måte å snakke sammen på der man systematisk setter fokus på styrker, det som fungerer og det som er positivt. I en anerkjennende samtale legger vi vekt på å være en engasjert og aktiv lytter.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "content10",
          style: "h2",
          children: [
            {
              _type: "span",
              _key: "span10",
              text: "SØKELYS PÅ DET POSITIVE",
              marks: ["strong"],
            },
          ],
        },
        {
          _type: "block",
          _key: "content11",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span11",
              text: "SØKELYS PÅ DET POSITIVE handler om å finne suksessfaktorer. Vi ser på det som går bra og forsøker å finne ut hvorfor det går bra. Det er nyttig kunnskap til en annen gang en lignende situasjon dukker opp. Ved å sette søkelys på det positive bidrar vi til å skape gode relasjoner og positive følelser. Det er viktig for læring, kreativitet og utvikling.",
              marks: [],
            },
          ],
        },
      ],
      order: 1,
    },
    {
      _type: "section",
      title: "Anerkjennende kommunikasjon",
      slug: { current: "anerkjennende-kommunikasjon" },
      tagline: "Kommuniser med anerkjennelse",
      description: "Hvordan kommunisere på en anerkjennende måte",
      sectionType: "content",
      showSidebar: true,
      themeColor: "mose-400",
      order: 2,
    },
    // Foreldre section
    {
      _type: "section",
      title: "Foreldre",
      slug: { current: "foreldre" },
      tagline: "Informasjon for foreldre",
      description: "Ressurser og informasjon for foreldre",
      sectionType: "content",
      showSidebar: true,
      themeColor: "bever-200",
      order: 3,
    },
  ];

  const sectionIds: Record<string, string> = {};

  for (const section of sections) {
    const id = await findOrCreateDocument(
      "section",
      `slug.current == "${section.slug.current}"`,
      section
    );
    sectionIds[section.slug.current] = id;
  }

  // Update siteSettings with main sections
  const trenerhandaId = sectionIds["trenerhanda"];
  const handbokaId = sectionIds["handboka"];

  if (trenerhandaId && handbokaId) {
    try {
      await client
        .patch("siteSettings")
        .set({
          mainSections: [
            { _type: "reference", _ref: trenerhandaId },
            { _type: "reference", _ref: handbokaId },
          ],
        })
        .commit();
      console.log("✅ Updated siteSettings with main sections");
    } catch (error: unknown) {
      // If siteSettings doesn't exist yet, create it
      if (error && typeof error === "object" && "statusCode" in error && error.statusCode === 404) {
        console.log("⚠️  siteSettings not found, will be created by seedSiteSettings");
      } else {
        throw error;
      }
    }
  }

  console.log("✅ Sections seeded");
  return sectionIds;
}

