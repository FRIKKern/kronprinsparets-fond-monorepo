import { client, findOrCreateDocument, createSlug } from "./sanityClient";

export async function seedActivities(sectionIds: Record<string, string>) {
  console.log("🌱 Seeding Activities...");

  const handbokaId = sectionIds["handboka"];
  if (!handbokaId) {
    console.log("⚠️  Handboka section not found, skipping activities");
    return;
  }

  const activities = [
    // Samarbeid activities
    {
      _type: "activity",
      title: "SMIL-stafett",
      slug: { current: "smil-stafett" },
      shortDescription: "Trener på å være positive",
      category: "samarbeid",
      duration: "10 min",
      purpose: "Trene på positivitet og samarbeid",
      equipment: ["3 SMIL-sjokolader"],
      steps: [
        "Del inn i 5 lag (5-6 personer på hvert lag, rollemodeller fyller plasser hvis det ikke går opp)",
        "Still lagene opp på rekke",
        "Løp til avtalt punkt og snu",
        "Når du kommer tilbake til laget skal du si noe positivt om dagen i dag",
        "Deretter er det veksling og en ny på laget springer",
        "Første lag i mål vinner SMIL-stafetten",
        "Vinnerlaget får utdelt 4 Smil-sjokolader og får ansvar for både å smile til- og å dele ut sjokolade til ALLE",
      ],
      reflectionQuestion: "Hvordan føltes det å si noe positivt til lagkameratene?",
      trainerTips: [
        "Kan tilpasses gruppestørrelse",
        "Vurder å gi alle sjokolade",
        "Fokuser på glede, ikke vinner",
      ],
      order: 1,
    },
    {
      _type: "activity",
      title: "Ballonglek",
      slug: { current: "ballonglek" },
      shortDescription: "Samarbeid for å holde ballongen i luften",
      category: "samarbeid",
      duration: "10 min",
      purpose: "Skape energi, samarbeide",
      equipment: ["5 ballonger, eller flere hvis det blir mange grupper"],
      steps: [
        "Del inn i grupper på 4-5 personer",
        "Gi hver gruppe en ballong som de skal blåse opp",
        "Gruppa stiller seg i en sirkel og holder hverandre i hendene",
        "Målet er å holde ballongen borte fra bakken ved å bruke ulike kroppsdeler, uten at en slipper hverandres hender",
        "Hvis ballongen berører bakken, velger lederen en kroppsdel som ikke lenger får benyttes",
        "Gruppa må finne andre måter å holde ballongen i lufta",
        "De kan aldri slippe hender",
        "Gi signal når du ønsker å avslutte aktiviteten",
        "Spør deretter hvordan de opplevde aktiviteten og samarbeidet i sirkelen",
      ],
      reflectionQuestion: "Hvordan opplevde dere aktiviteten og samarbeidet i sirkelen?",
      trainerTips: [
        "Lederne observerer gruppene",
        "Øk vanskelighetsgraden ved å fjerne flere kroppsdeler",
        "Fokuser på samarbeid, ikke konkurranse",
      ],
      order: 2,
    },
    // Vennskap activities
    {
      _type: "activity",
      title: "Jeg liker",
      slug: { current: "jeg-liker" },
      shortDescription: "Lære å se positive sider ved hverandre",
      category: "vennskap",
      duration: "10 min",
      purpose: "Skape energi i gruppa. Bli bedre kjent",
      equipment: ["Markeringsmatter og/eller kjegler"],
      steps: [
        "Alle sitter i ring ved hver sin markeringsmatte/kjegle",
        "Trener står i midten og har ingen plass i sirkelen",
        "Innled leken: Et godt utgangspunkt for vennskap er å finne ut hva vi har til felles",
        "Prøv å huske noe av det som blir sagt i leken, så kan dere kanskje også snakke mer om det seinere i dag",
        "Trener forteller noe h*n liker, f.eks. «Jeg liker å reise»",
        "Alle som også liker å reise må raskt finne en ny plass i sirkelen",
        "Den som ikke finner en plass, blir ny i midten",
        "Dersom man ikke kommer på noe man liker å gjøre kan man fortelle om noe man liker å spise",
      ],
      reflectionQuestion: "Hva har dere til felles?",
      trainerTips: [
        "Modell aktiviteten først",
        "Sørg for at alle får si noe",
        "Fokuser på autentiske kommentarer",
        "Prøv å huske noe av det som blir sagt",
      ],
      order: 1,
    },
    {
      _type: "activity",
      title: "Speed friend",
      slug: { current: "speed-friend" },
      shortDescription: "Raskt bli kjent med hverandre",
      category: "vennskap",
      duration: "15 min",
      purpose: "Lære å vise interesse, stille spørsmål slik at man blir bedre kjent",
      equipment: ["Ingenting"],
      steps: [
        "Samle ungdommene på to rekker som sitter/står overfor hverandre",
        "Introduser øvelsen: Vi skal nå ha en speed-date med hverandre",
        "En god måte å bli kjent er å stille spørsmål, og vise interesse for den man snakker med",
        "Dere skal stille enkle spørsmål, for eksempel: Hva liker du å gjøre på fritida? Hva er favoritt-middagsretten din? Hvem ville du vært strandet på en øde av sammen med? Hvilken superhelt mener du er best, og hvorfor? Hvilken årstid liker du best, og hvorfor?",
        "Samtalen kommer til å vare ett minutt",
        "Prøv å veksle på hvem som spør og svarer slik at det blir samtale og ikke intervju",
        "Ungdommene speed-friender hverandre i 1 minutt, blås i fløyta",
        "Deretter flytter alle på den ene rekka seg et «hakk» til siden slik at de får en ny person foran seg",
        "Sørg for at alle snakker med fem ulike personer",
      ],
      reflectionQuestion: "Hva skal til for at man blir bedre kjent med andre? Hva kan dere på laget gjøre for å bli bedre kjent?",
      trainerTips: [
        "Gi tydelige spørsmål å snakke om",
        "Sørg for at alle får snakke",
        "Fokuser på lytte, ikke bare snakke",
        "Veksle på hvem som spør og svarer",
      ],
      order: 2,
    },
    {
      _type: "activity",
      title: "Vennskap – dialogspill",
      slug: { current: "vennskap-dialogspill" },
      shortDescription: "Diskutere påstander og bli bedre kjent",
      category: "vennskap",
      duration: "20 min",
      purpose: "Bli bedre kjent gjennom dialog og diskusjon",
      equipment: ["Påstander", "Spillbrett"],
      steps: [
        "Denne aktiviteten bør gjennomføres et rolig sted, sittende rundt bord",
        "Del i grupper på 4-5 personer",
        "Gi tydelig instruksjon før øvelsen skal starte slik at alle forstår metoden",
        "Hver gruppe får en bunke påstander og et spillbrett",
        "En ungdom begynner med å trekke en påstand fra bunken, leser og plasserer påstanden der h*n tenker at den passer: Enig, uenig eller delvis enig",
        "Så forteller ungdommen hvorfor h*n velger å legge påstanden der",
        "De andre i gruppa kan stille spørsmål eller dele sine meninger",
        "Fortsett til alle har hatt mulighet til å trekke og plassere påstander",
      ],
      reflectionQuestion: "Hva lærte dere om hverandre gjennom diskusjonen?",
      trainerTips: [
        "Modell aktiviteten først",
        "Sørg for at alle får si noe",
        "Fokuser på respektfulle diskusjoner",
        "La alle uttrykke sine meninger",
      ],
      order: 3,
    },
    // Selvfølelse activities
    {
      _type: "activity",
      title: "Stolpeplassering",
      slug: { current: "stolpeplassering" },
      shortDescription: "Reflektere over egne styrker",
      category: "selvfolelse",
      duration: "20 min",
      purpose: "Bygge selvfølelse gjennom å se egne styrker",
      equipment: ["Stolper eller kjegler"],
      steps: [
        "Plasser stolper i en linje",
        "Hver person stiller seg ved stolpen som representerer sin styrke",
        "Forklar hvorfor du valgte denne stolpen",
        "Andre kan legge til positive kommentarer",
      ],
      reflectionQuestion: "Hva er din største styrke, og hvordan bruker du den?",
      trainerTips: [
        "Modell aktiviteten først",
        "Sørg for at alle får si noe",
        "Fokuser på styrker, ikke svakheter",
      ],
      order: 1,
    },
    // Kommunikasjon activities
    {
      _type: "activity",
      title: "Anerkjennende setninger",
      slug: { current: "anerkjennende-setninger" },
      shortDescription: "Lære å kommunisere med anerkjennelse",
      category: "kommunikasjon",
      duration: "15 min",
      purpose: "Trene anerkjennende kommunikasjon",
      equipment: [],
      steps: [
        "Del inn i par",
        "Hver person forteller om noe de er stolte av",
        "Partneren svarer med anerkjennende setninger",
        "Bytt roller",
        "Del med gruppen",
      ],
      reflectionQuestion: "Hvordan føltes det å få anerkjennelse?",
      trainerTips: [
        "Gi eksempler på anerkjennende setninger",
        "Fokuser på autentisitet",
        "Modell aktiviteten først",
      ],
      order: 1,
    },
  ];

  const activityIds: string[] = [];

  for (const activity of activities) {
    const id = await findOrCreateDocument(
      "activity",
      `slug.current == "${activity.slug.current}"`,
      activity
    );
    activityIds.push(id);
  }

  // Update Handboka section with activities as children
  if (activityIds.length > 0) {
    const currentSection = await client.getDocument(handbokaId);
    const existingChildren = currentSection.children || [];
    
    await client
      .patch(handbokaId)
      .set({
        children: [
          ...existingChildren,
          ...activityIds.map((id) => ({ _type: "reference", _ref: id })),
        ],
      })
      .commit();
    console.log(`✅ Updated Handboka with ${activityIds.length} activities`);
  }

  console.log("✅ Activities seeded");
  return activityIds;
}

