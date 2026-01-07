import { findOrCreateDocument } from "./sanityClient";

export async function seedFAQs() {
  console.log("🌱 Seeding FAQs...");

  const faqs = [
    {
      _type: "faq",
      question: "Hva gjør jeg når noen alltid blir valgt sist?",
      answer: [
        {
          _type: "block",
          _key: "answer1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Dette er et viktig tema. Fokuser på å skape inkluderende aktiviteter hvor alle føler seg verdsatt. Bruk aktiviteter som ikke har en 'siste' person, eller hvor alle får være med på en positiv måte.",
              marks: [],
            },
          ],
        },
      ],
      order: 1,
    },
    {
      _type: "faq",
      question: "Hvordan heier jeg uten å presse?",
      answer: [
        {
          _type: "block",
          _key: "answer1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Viktig å heie på innsats og framskritt, ikke bare resultat. Vær autentisk og spesifikk i anerkjennelsen din. La barna føle at de er verdsatt for hvem de er, ikke bare hva de oppnår.",
              marks: [],
            },
          ],
        },
      ],
      order: 2,
    },
    {
      _type: "faq",
      question: "Hva hvis et barn ikke vil delta?",
      answer: [
        {
          _type: "block",
          _key: "answer1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Respekter barnets valg, men prøv å forstå årsaken. Kanskje aktiviteten er for vanskelig, eller barnet trenger en pause. Tilpass aktiviteten eller gi alternativer. Viktig å ikke tvinge, men heller skape trygghet og glede.",
              marks: [],
            },
          ],
        },
      ],
      order: 3,
    },
    {
      _type: "faq",
      question: "Hvordan håndterer jeg konflikter?",
      answer: [
        {
          _type: "block",
          _key: "answer1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Konflikter er naturlige. Fokuser på å lytte til begge parter, hjelp dem med å forstå hverandres perspektiv, og finn løsninger sammen. Bruk anerkjennende kommunikasjon og fokuser på løsninger, ikke skyld.",
              marks: [],
            },
          ],
        },
      ],
      order: 4,
    },
  ];

  const faqIds: string[] = [];

  for (const faq of faqs) {
    const id = await findOrCreateDocument(
      "faq",
      `question == "${faq.question}"`,
      faq
    );
    faqIds.push(id);
  }

  console.log("✅ FAQs seeded");
  return faqIds;
}

