import { defineField, defineType } from "sanity";

export default defineType({
  name: "activity",
  title: "Aktivitet",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Kort beskrivelse",
      type: "string",
      description: "En-linjes beskrivelse for kort",
    }),
    defineField({
      name: "videoUrl",
      title: "Video-URL",
      type: "url",
      description: "YouTube video-URL",
    }),
    defineField({
      name: "pdfFile",
      title: "PDF-fil",
      type: "file",
      description: "Last opp PDF-fil (valgfritt)",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Samarbeid", value: "samarbeid" },
          { title: "Vennskap", value: "vennskap" },
          { title: "Selvfølelse", value: "selvfolelse" },
          { title: "Kommunikasjon", value: "kommunikasjon" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    // Metadata chips
    defineField({
      name: "duration",
      title: "Varighet",
      type: "string",
      description: "f.eks. '10 min'",
    }),
    defineField({
      name: "purpose",
      title: "Hensikt",
      type: "string",
      description: "Hva denne aktiviteten trener",
    }),
    defineField({
      name: "equipment",
      title: "Utstyr",
      type: "array",
      of: [{ type: "string" }],
    }),
    // Main content
    defineField({
      name: "steps",
      title: "Gjennomføring",
      type: "array",
      of: [{ type: "string" }],
      description: "Nummererte steg for hvordan aktiviteten gjennomføres",
    }),
    defineField({
      name: "reflectionQuestion",
      title: "Refleksjonsspørsmål",
      type: "string",
      description: "Fremhevet spørsmål",
    }),
    defineField({
      name: "trainerTips",
      title: "Tips til trener",
      type: "array",
      of: [{ type: "string" }],
    }),
    // Optional extras
    defineField({
      name: "variations",
      title: "Variasjoner",
      type: "blockContent",
      description: "Valgfrie variasjoner eller tilpasninger",
    }),
    defineField({
      name: "ageGroups",
      title: "Aldersgrupper",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "6-9 år", value: "6-9" },
          { title: "10-12 år", value: "10-12" },
          { title: "13-15 år", value: "13-15" },
          { title: "16+ år", value: "16+" },
        ],
      },
    }),
    defineField({
      name: "groupSize",
      title: "Gruppestørrelse",
      type: "string",
      options: {
        list: [
          { title: "Små grupper (2-5)", value: "small" },
          { title: "Medium (6-15)", value: "medium" },
          { title: "Store grupper (16+)", value: "large" },
          { title: "Alle størrelser", value: "any" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});

