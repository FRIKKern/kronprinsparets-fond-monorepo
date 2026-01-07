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
  ],
  preview: {
    select: {
      title: "siteTitle",
    },
  },
});

