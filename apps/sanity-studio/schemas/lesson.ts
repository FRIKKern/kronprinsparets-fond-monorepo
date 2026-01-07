import { defineField, defineType } from "sanity";

export default defineType({
  name: "lesson",
  title: "Leksjon",
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
      name: "subtitle",
      title: "Undertittel",
      type: "string",
      description: "Kjerneverdi eller kort beskrivelse",
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
      name: "content",
      title: "Innhold",
      type: "blockContent",
    }),
    defineField({
      name: "tips",
      title: "Tips",
      type: "array",
      of: [{ type: "string" }],
      description: "Praktiske tips for trenere",
    }),
    defineField({
      name: "relatedContent",
      title: "Relatert innhold",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "section" }, { type: "activity" }],
        },
      ],
      description: "Lenker til Håndboka-innhold",
    }),
    defineField({
      name: "order",
      title: "Rekkefølge",
      type: "number",
      description: "Visningsrekkefølge innenfor overordnet seksjon",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
});

