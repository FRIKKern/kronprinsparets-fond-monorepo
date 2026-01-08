import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Nettstedsinnstillinger",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Nettstedstittel",
      type: "string",
      initialValue: "FLYT Idrett",
    }),
    defineField({
      name: "siteDescription",
      title: "Nettstedsbeskrivelse",
      type: "text",
    }),
    defineField({
      name: "landingPageIntro",
      title: "Introduksjon på landingsside",
      type: "blockContent",
    }),
    defineField({
      name: "landingPageImages",
      title: "Landingsside-bilder",
      description: "Bilder som vises mellom hero og seksjonskort (valgfritt)",
      type: "array",
      of: [
        {
          type: "object",
          name: "landingPageImage",
          title: "Landingsside-bilde",
          fields: [
            defineField({
              name: "image",
              title: "Bilde",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "alt",
              title: "Alt-tekst",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "alt",
              media: "image",
            },
          },
        },
      ],
    }),
    defineField({
      name: "mainSections",
      title: "Hovedseksjoner",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "section" }],
        },
      ],
      description: "Referanser til Trenerhånda og Håndboka",
    }),
    defineField({
      name: "sectionCardsTitle",
      title: "Tittel over seksjonskort",
      type: "string",
      initialValue: "Velg din vei inn",
    }),
    defineField({
      name: "sectionCardsSubtitle",
      title: "Undertekst over seksjonskort",
      type: "string",
      initialValue: "To innganger til samme mål: et trygt og inkluderende idrettsmiljø",
    }),
    defineField({
      name: "featureBoxes",
      title: "Feature-bokser",
      description: "Bokser som vises på forsiden (f.eks. Kunnskapsbasert, For alle trenere, etc.)",
      type: "array",
      of: [
        {
          type: "object",
          name: "featureBox",
          title: "Feature-boks",
          fields: [
            defineField({
              name: "icon",
              title: "Ikon",
              type: "string",
              description: "Ikonnavn (f.eks. book, users, lightbulb, star, heart, play)",
              initialValue: "star",
            }),
            defineField({
              name: "title",
              title: "Tittel",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Beskrivelse",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
    }),
    defineField({
      name: "footerContactLabel",
      title: "Footer kontaktetikett",
      type: "string",
      description: "Teksten før kontaktpersonens navn (f.eks. 'Kontaktperson:')",
      initialValue: "Kontaktperson:",
    }),
    defineField({
      name: "footerContactName",
      title: "Footer kontaktperson navn",
      type: "string",
      initialValue: "Silje Mørtvedt",
    }),
    defineField({
      name: "footerContactEmail",
      title: "Footer kontakt e-post",
      type: "string",
      initialValue: "silje@kppfond.no",
    }),
  ],
  preview: {
    select: {
      title: "siteTitle",
    },
  },
});
