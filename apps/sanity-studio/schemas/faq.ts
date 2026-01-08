import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "Spørsmål og svar",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Spørsmål",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Svar",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Rekkefølge",
      type: "number",
      description: "Visningsrekkefølge",
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
      title: "question",
    },
  },
});
