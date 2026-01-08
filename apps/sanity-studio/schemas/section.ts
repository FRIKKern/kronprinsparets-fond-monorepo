import { defineField, defineType } from "sanity";

export default defineType({
  name: "section",
  title: "Seksjon",
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
      title: "Slug (URL-sti)",
      type: "slug",
      options: {
        source: "title",
      },
      description: "⚠️ IKKE ENDRE DETTE! Slug er koblet til URL-strukturen og koden. Endring vil ødelegge navigasjon og lenker på nettsiden.",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Kort beskrivelse vist på kort",
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Ikon (bilde)",
      type: "image",
      description: "Ikon vist på seksjonskort (valgfritt)",
    }),
    defineField({
      name: "iconName",
      title: "Ikon (Lucide)",
      type: "string",
      description: "Lucide icon name (f.eks. play, star, heart, users, lightbulb, help-circle)",
    }),
    defineField({
      name: "themeColor",
      title: "Temafarge",
      type: "string",
      options: {
        list: [
          { title: "Krikkand (Turkis)", value: "krikkand-400" },
          { title: "Mose (Grønn)", value: "mose-400" },
          { title: "Bark (Rødbrun)", value: "bark-200" },
          { title: "Halm (Gul)", value: "halm-400" },
          { title: "Bever (Beige)", value: "bever-200" },
          { title: "Skifer (Grå)", value: "skifer-100" },
        ],
      },
      initialValue: "krikkand-400",
    }),
    defineField({
      name: "sectionType",
      title: "Seksjonstype",
      type: "string",
      options: {
        list: [
          { title: "Hovedseksjon", value: "main" },
          { title: "Kategori", value: "category" },
          { title: "Innholdsside", value: "content" },
        ],
      },
      initialValue: "main",
    }),
    defineField({
      name: "showSidebar",
      title: "Vis sidefelt",
      type: "boolean",
      description: "Vis sidefeltnavigasjon (Håndboka = true, Trenerhånda = false)",
      initialValue: false,
    }),
    defineField({
      name: "children",
      title: "Underelementer",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "section" },
            { type: "lesson" },
            { type: "activity" },
            { type: "game" },
          ],
        },
      ],
      description: "Underseksjoner, leksjoner, aktiviteter eller leker",
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
      name: "parentSection",
      title: "Overordnet seksjon",
      type: "reference",
      to: [{ type: "section" }],
      description: "Hvilken seksjon dette tilhører (for navigasjon)",
    }),
    defineField({
      name: "content",
      title: "Innhold",
      type: "blockContent",
    }),
    defineField({
      name: "order",
      title: "Rekkefølge",
      type: "number",
      description: "Visningsrekkefølge",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tagline",
      media: "icon",
    },
  },
});

