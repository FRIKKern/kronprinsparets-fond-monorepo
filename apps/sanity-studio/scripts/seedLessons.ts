import { client, findOrCreateDocument } from "./sanityClient";

export async function seedLessons(sectionIds: Record<string, string>) {
  console.log("🌱 Seeding Lessons...");

  const trenerhandaId = sectionIds["trenerhanda"];
  if (!trenerhandaId) {
    console.log("⚠️  Trenerhanda section not found, skipping lessons");
    return;
  }

  const lessons = [
    {
      _type: "lesson",
      title: "Oppstart",
      slug: { current: "oppstart" },
      subtitle: "Velkommen og tilhørighet",
      order: 1,
      content: [
        {
          _type: "block",
          _key: "content1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Oppstart er viktig for å skape trygghet og tilhørighet. Her lærer vi hvordan vi starter treningen på en god måte.",
              marks: [],
            },
          ],
        },
      ],
      tips: [
        "Hils alle ved navn når de kommer",
        "Bruk positive ord og kroppsspråk",
        "Gi tydelige instruksjoner",
      ],
    },
    {
      _type: "lesson",
      title: "Vi hilser",
      slug: { current: "vi-hilser" },
      subtitle: "Tilhørighet og trygghet",
      order: 2,
      content: [
        {
          _type: "block",
          _key: "content1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Å hilse er mer enn bare å si hei. Det handler om å se hverandre og skape en følelse av tilhørighet.",
              marks: [],
            },
          ],
        },
      ],
      tips: [
        "Se hver person i øynene når du hilser",
        "Bruk personens navn",
        "Vær tilstede i øyeblikket",
      ],
    },
    {
      _type: "lesson",
      title: "Vi heier",
      slug: { current: "vi-heier" },
      subtitle: "Anerkjennelse og støtte",
      order: 3,
      content: [
        {
          _type: "block",
          _key: "content1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Å heie handler om å anerkjenne innsats og styrker. Det bygger selvfølelse og motivasjon.",
              marks: [],
            },
          ],
        },
      ],
      tips: [
        "Hei på innsats, ikke bare resultat",
        "Vær spesifikk i anerkjennelsen",
        "Bruk autentiske ord",
      ],
    },
    {
      _type: "lesson",
      title: "Vi leker",
      slug: { current: "vi-leker" },
      subtitle: "Glede og engasjement",
      order: 4,
      content: [
        {
          _type: "block",
          _key: "content1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Lek er viktig for læring og utvikling. Her lærer vi hvordan vi skaper glede og engasjement gjennom lek.",
              marks: [],
            },
          ],
        },
      ],
      tips: [
        "La barna være med på å bestemme regler",
        "Fokuser på glede, ikke konkurranse",
        "Tilpass leken til gruppen",
      ],
    },
    {
      _type: "lesson",
      title: "Vi lærer",
      slug: { current: "vi-laerer" },
      subtitle: "Vekst og utvikling",
      order: 5,
      content: [
        {
          _type: "block",
          _key: "content1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Læring skjer hele tiden. Her lærer vi hvordan vi støtter læring og utvikling på en positiv måte.",
              marks: [],
            },
          ],
        },
      ],
      tips: [
        "Gi konstruktiv tilbakemelding",
        "La barna prøve og feile",
        "Feire små framskritt",
      ],
    },
    {
      _type: "lesson",
      title: "Vi er best sammen",
      slug: { current: "vi-er-best-sammen" },
      subtitle: "Samarbeid og fellesskap",
      order: 6,
      content: [
        {
          _type: "block",
          _key: "content1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Sammen er vi sterkere. Her lærer vi hvordan vi bygger fellesskap og samarbeid.",
              marks: [],
            },
          ],
        },
      ],
      tips: [
        "Skape felles mål",
        "Fremme samarbeid over konkurranse",
        "Verdsette hver enkelt i gruppen",
      ],
    },
  ];

  const lessonIds: string[] = [];

  for (const lesson of lessons) {
    const id = await findOrCreateDocument(
      "lesson",
      `slug.current == "${lesson.slug.current}"`,
      lesson
    );
    lessonIds.push(id);
  }

  // Update Trenerhanda section with lessons as children
  if (lessonIds.length > 0) {
    await client
      .patch(trenerhandaId)
      .set({
        children: lessonIds.map((id) => ({ _type: "reference", _ref: id })),
      })
      .commit();
    console.log(`✅ Updated Trenerhanda with ${lessonIds.length} lessons`);
  }

  console.log("✅ Lessons seeded");
  return lessonIds;
}

