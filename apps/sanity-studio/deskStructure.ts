import { StructureBuilder } from "sanity/desk";
import {
  CogIcon,
  BookIcon,
  DocumentsIcon,
  PlayIcon,
  UsersIcon,
  HelpCircleIcon,
  HomeIcon,
  ComponentIcon,
  ActivityIcon,
  StarIcon,
  HeartIcon,
  UserIcon,
  CommentIcon,
} from "@sanity/icons";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("FLYT Idrett")
    .items([
      // Site Settings (Singleton)
      S.listItem()
        .title("Nettstedsinnstillinger")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),

      S.divider(),

      // Trenerhanda Section
      S.listItem()
        .title("Trenerhanda")
        .icon(BookIcon)
        .child(
          S.list()
            .title("Trenerhanda")
            .items([
              S.listItem()
                .title("Oversiktseksjon")
                .icon(HomeIcon)
                .child(
                  S.documentList()
                    .title("Trenerhanda-seksjoner")
                    .filter('_type == "section" && slug.current == "trenerhanda"')
                ),
              S.divider(),
              S.listItem()
                .title("Alle leksjoner")
                .icon(DocumentsIcon)
                .child(
                  S.documentTypeList("lesson")
                    .title("Leksjoner")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
            ])
        ),

      // Handboka Section (Main hierarchy)
      S.listItem()
        .title("Handboka")
        .icon(BookIcon)
        .child(
          S.list()
            .title("Handboka")
            .items([
              // Videos
              S.listItem()
                .title("Filmer")
                .icon(PlayIcon)
                .child(
                  S.documentTypeList("video")
                    .title("Videoer")
                    .defaultOrdering([{ field: "title", direction: "asc" }])
                ),

              // Metodikk
              S.listItem()
                .title("Metodikk")
                .icon(ComponentIcon)
                .child(
                  S.documentList()
                    .title("Metodikk-seksjoner")
                    .filter('_type == "section" && sectionType == "content"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),

              S.divider(),

              // Activities by Category
              S.listItem()
                .title("Aktiviteter")
                .icon(ActivityIcon)
                .child(
                  S.list()
                    .title("Aktiviteter etter kategori")
                    .items([
                      S.listItem()
                        .title("Samarbeid")
                        .icon(UsersIcon)
                        .child(
                          S.documentList()
                            .title("Samarbeidsaktiviteter")
                            .filter('_type == "activity" && category == "samarbeid"')
                            .defaultOrdering([{ field: "title", direction: "asc" }])
                        ),
                      S.listItem()
                        .title("Vennskap")
                        .icon(HeartIcon)
                        .child(
                          S.documentList()
                            .title("Vennskapsaktiviteter")
                            .filter('_type == "activity" && category == "vennskap"')
                            .defaultOrdering([{ field: "title", direction: "asc" }])
                        ),
                      S.listItem()
                        .title("Selvfolelse")
                        .icon(StarIcon)
                        .child(
                          S.documentList()
                            .title("Selvfolelseaktiviteter")
                            .filter('_type == "activity" && category == "selvfolelse"')
                            .defaultOrdering([{ field: "title", direction: "asc" }])
                        ),
                      S.listItem()
                        .title("Kommunikasjon")
                        .icon(CommentIcon)
                        .child(
                          S.documentList()
                            .title("Kommunikasjonsaktiviteter")
                            .filter('_type == "activity" && category == "kommunikasjon"')
                            .defaultOrdering([{ field: "title", direction: "asc" }])
                        ),
                      S.divider(),
                      S.listItem()
                        .title("Alle aktiviteter")
                        .icon(DocumentsIcon)
                        .child(
                          S.documentTypeList("activity")
                            .title("Alle aktiviteter")
                            .defaultOrdering([{ field: "title", direction: "asc" }])
                        ),
                    ])
                ),

              // Lekebank
              S.listItem()
                .title("Lekebank")
                .icon(StarIcon)
                .child(
                  S.documentTypeList("game")
                    .title("Leker")
                    .defaultOrdering([{ field: "title", direction: "asc" }])
                ),

              // Foreldre
              S.listItem()
                .title("Foreldre")
                .icon(UserIcon)
                .child(
                  S.documentList()
                    .title("Foreldreseksjoner")
                    .filter('_type == "section" && slug.current match "foreldre*"')
                ),

              S.divider(),

              // FAQs
              S.listItem()
                .title("Sporsmal og Svar")
                .icon(HelpCircleIcon)
                .child(
                  S.documentTypeList("faq")
                    .title("Spørsmål og svar")
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                ),
            ])
        ),

      S.divider(),

      // All Content (Power user access)
      S.listItem()
        .title("Alt innhold")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Alt innhold")
            .items([
              S.documentTypeListItem("section").title("Alle seksjoner"),
              S.documentTypeListItem("lesson").title("Alle leksjoner"),
              S.documentTypeListItem("activity").title("Alle aktiviteter"),
              S.documentTypeListItem("game").title("Alle leker"),
              S.documentTypeListItem("video").title("Alle videoer"),
              S.documentTypeListItem("faq").title("Alle spørsmål og svar"),
            ])
        ),
    ]);
