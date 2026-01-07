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
  ],
  preview: {
    select: {
      title: "question",
    },
  },
});

