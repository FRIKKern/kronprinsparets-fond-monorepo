import { defineField, defineType } from "sanity";

export default defineType({
  name: "game",
  title: "Lek",
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
      name: "description",
      title: "Beskrivelse",
      type: "blockContent",
    }),
    defineField({
      name: "videoUrl",
      title: "Video-URL",
      type: "url",
      description: "YouTube video-URL (valgfritt)",
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
      name: "pdfFiles",
      title: "PDF-filer",
      type: "array",
      description: "Flere PDF-filer (valgfritt)",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "file",
              title: "PDF-fil",
              type: "file",
              options: { accept: ".pdf" },
            },
            {
              name: "title",
              title: "PDF-tittel",
              type: "string",
            },
            {
              name: "description",
              title: "PDF-beskrivelse",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "pdfTitle",
      title: "PDF-tittel",
      type: "string",
      description: "Tittel vist ved PDF-nedlasting (valgfritt)",
    }),
    defineField({
      name: "pdfDescription",
      title: "PDF-beskrivelse",
      type: "string",
      description: "Beskrivelse vist ved PDF-nedlasting (valgfritt)",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
