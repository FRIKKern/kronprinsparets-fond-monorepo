import { client, findOrCreateDocument } from "./sanityClient";

export async function seedGames(sectionIds: Record<string, string>) {
  console.log("🌱 Seeding Games...");

  const handbokaId = sectionIds["handboka"];
  if (!handbokaId) {
    console.log("⚠️  Handboka section not found, skipping games");
    return;
  }

  const games = [
    {
      _type: "game",
      title: "Finn lederen",
      slug: { current: "finn-lederen" },
      description: [
        {
          _type: "block",
          _key: "desc1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "En lek hvor gruppen skal finne ut hvem som er lederen. Alle sitter i en sirkel og en person går ut. Gruppen velger en leder som starter bevegelser som alle andre følger. Den som kommer inn skal finne ut hvem som er lederen.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "Lederen begynner å gjøre en bevegelse, for eksempel klappe, nikke eller knipse. De andre gjør det samme. Etter en stund skifter lederen bevegelse, og de andre følger på. Det er om å gjøre for den som er kommet inn å finne ut hvem som er lederen.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "game",
      title: "Menneske-memo",
      slug: { current: "menneske-memo" },
      description: [
        {
          _type: "block",
          _key: "desc1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "To ungdommer går ut på gangen. Resten av gruppa går to og to sammen og skal finne en bevegelse og en lyd som de to har felles. Når alle har funnet en bevegelse og en lyd, stiller de seg opp i rommet.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "De to på gangen kommer inn og veksler på å gjette par. De de peker på må gjøre sin bevegelse og sin lyd. Om de er et par forlater de plassen sin og stiller seg ved siden av den som gjettet dem. Vinneren er den av de to på gangen som får flest par.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "game",
      title: "Blodpotet",
      slug: { current: "blodpotet" },
      description: [
        {
          _type: "block",
          _key: "desc1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Først stiller alle seg i en sirkel. Den som leder leken, skal gi ut roller til deltakerne ved å prikke dem på skulderen. Lekleder gir én prikk til alle som er poteter, og to prikker til de som er blodpoteter. Det skal være 3 blodpoteter.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "Deretter skal alle begynne å bevege seg rundt i rommet. Alle skal gå rundt å hilse på hverandre. Når man hilser skal man hviske og presentere seg som potet eller evt. blodpotet. Hilser du på en som hvisker \"blodpotet\" til deg, har du bare sekunder igjen å leve.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span3",
              text: "Vent et par sekunder med å dø, slik at ikke andre finner ut hvem blodpoteten er. Når du dør, skal dette skje med smertehyl og overdrivelse. Som død må du stille deg på siden av området der deltakerne vandrer rundt og hilser på hverandre.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "game",
      title: "Atomleken",
      slug: { current: "atomleken" },
      description: [
        {
          _type: "block",
          _key: "desc1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Alle står på gulvet, utenom lekelederen som står på en stol slik at alle kan høre. Lederen ber alle om å gå rundt i rommet. Ingen skal gå sammen eller ved siden av hverandre hele tiden.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "Plutselig roper lederen et tall, f. eks 4. Da skal alle i rommet gå sammen 4 og 4, holde hender og sette seg ned. Dersom noen har gått sammen i større eller mindre grupper enn angitt, er de ute av leken.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span3",
              text: "Hvis alle har laget riktig antall i gruppene sine, kan man sende ut de som var tregest til å sette seg. Lekleder ber alle om å gå rundt i rommet igjen og roper et nytt tall. Slik går det til det bare er to personer igjen, som er vinnerne!",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "game",
      title: "Schwing schwang schwung",
      slug: { current: "schwing-schwang-schwung" },
      description: [
        {
          _type: "block",
          _key: "desc1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Leken er en utvidet utgave av «stein, saks, papir». Dette er en alle-mot-alle-lek, der målet for hver enkelt deltaker er å nå det høyeste nivået av utvikling, «Buddha».",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "Nivå 1 er amøbe. Man viser at man er amøbe ved å vralte rundt med bøy i knærne, dunke seg i hodet med knyttneven og si «eggeggeggeggeggeggeg». Når to amøber møtes, stiller de seg mot hverandre, og sier «Schwing, schwang, schwung» og 'schwinger' høyre arm i takt med disse magiske ordene.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span3",
              text: "Etter «schwung» gjør de steinsaks- eller papir-tegn mot hverandre. Taperen fortsetter sitt liv som amøbe, og leter etter andre amøber å konkurrere med. Vinneren utvikler seg til en drage.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span4",
              text: "Nivå 2 er drage. Dragene viser at de er drager ved å klampe rundt og brøle «ooååaaaahh» og se skumle ut. Disse oppsøker og møter andre drager som de konkurrerer med. Taperen etter dragekampen går tilbake til amøbestadiet.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span5",
              text: "Nivå 3 er prinsesse som tripper rundt med armene over hodet og sier «dingelingelingelingeling». Hun oppsøker andre prinsesser som hun konkurrerer mot. Taperen går tilbake til dragestadiet, og vinneren av prinsessekonkurransen når det høyeste nivået av utvikling, nirvana, og blir til en buddha.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc6",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span6",
              text: "Nivå 4 er Buddha. Buddhaen setter seg i skredderstilling på gulvet og lager en fornøyd summelyd, mens han betrakter de stakkars vesenene som fortsatt må slite.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "game",
      title: "Katt og mus",
      slug: { current: "katt-og-mus" },
      description: [
        {
          _type: "block",
          _key: "desc1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Avgrens et lekeområde. Lekeleder velger en som skal være katt. Resten skal være mus. Musene skal i hemmelighet velge en som skal være supermus, som alle de andre musene skal verne om. Katten skal ikke vite hvem som er supermus.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "Katten bor midt i aktivitetsområdet. Det er om å gjøre for alle musene å komme seg over dette aktivitetsområdet gang etter gang uten at supermusa blir tatt. De vanlige musene må altså bøte med livet for at supermusa skal leve.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span3",
              text: "Musene som blir tatt sitter på sidelinjen. Hvis supermusa er siste mus som blir tatt, vinner musene. Hvis ikke, har katten vunnet!",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "game",
      title: "Finn fem feil",
      slug: { current: "finn-fem-feil" },
      description: [
        {
          _type: "block",
          _key: "desc1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "Lag par. Be dem først om å se på hverandre i 30 sekunder og deretter snu ryggen til hverandre og forandre fem ting på utseendet sitt (klær, hår, noe de holder i hendene, m.m.). Minst en forandring skal være veldig tøysete.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "Partnerne snur seg så mot hverandre igjen når de er klar og forsøker å gjette de fem tingene som er forandret.",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "game",
      title: "Vaskemaskin",
      slug: { current: "vaskemaskin" },
      description: [
        {
          _type: "block",
          _key: "desc1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span1",
              text: "En voksen leder leken stående i sirkel. Lekelederen «befaler» hva man skal lage: Vaskemaskin, Elefant, Mor med barn. Man peker på en person, men de to som står ved siden av er også med.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span2",
              text: "Etter noen testrunder ryker man ut av leken hvis man glemmer hva man skal gjøre. Øk tempoet gradvis.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "desc3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span3",
              text: "Vaskemaskin: Den i midten holder armene rett ut fra kroppen. Naboene snurrer under hver sin arm. Elefant: Den i midten lager snabel med armene. Naboene er ører som vifter. Mor med barn: Den i midten er mor som rører i ei gryte. Naboene er barna som sutter på tommel og holder seg fast i hver sin fot.",
              marks: [],
            },
          ],
        },
      ],
    },
  ];

  const gameIds: string[] = [];

  for (const game of games) {
    const id = await findOrCreateDocument(
      "game",
      `slug.current == "${game.slug.current}"`,
      game
    );
    gameIds.push(id);
  }

  // Update Handboka section with games as children
  if (gameIds.length > 0) {
    const currentSection = await client.getDocument(handbokaId);
    if (!currentSection) {
      console.log("⚠️  Handboka section not found, skipping game references");
      return gameIds;
    }
    const existingChildren = currentSection.children || [];
    
    await client
      .patch(handbokaId)
      .set({
        children: [
          ...existingChildren,
          ...gameIds.map((id) => ({ _type: "reference", _ref: id })),
        ],
      })
      .commit();
    console.log(`✅ Updated Handboka with ${gameIds.length} games`);
  }

  console.log("✅ Games seeded");
  return gameIds;
}

