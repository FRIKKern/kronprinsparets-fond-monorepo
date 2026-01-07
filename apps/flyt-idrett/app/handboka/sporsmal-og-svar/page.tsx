import { client } from "@/lib/sanity";
import { ALL_FAQS_QUERY, SECTION_QUERY } from "@/lib/queries";
import { Accordion } from "@/components/Accordion";
import { PdfDownload } from "@/components/PdfDownload";
import { DecorativeShapes } from "@/components/DecorativeShapes";
import { Icon } from "@/components/Icon";
import { Heading1, Body1 } from "@kpf/ui";

async function getFAQData() {
  const [faqs, section] = await Promise.all([
    client.fetch(ALL_FAQS_QUERY),
    client.fetch(SECTION_QUERY, { slug: "sporsmal-og-svar" }),
  ]);
  return { faqs: faqs || [], section };
}

export default async function SporsmalOgSvarPage() {
  const { faqs, section } = await getFAQData();

  return (
    <>
      {/* Breadcrumbs */}
      {/* <Breadcrumbs
        items={[
          { label: "Håndboka", href: "/handboka" },
          { label: "Spørsmål og svar" },
        ]}
      /> */}

      {/* Header */}
      <header className="relative py-8 mb-8">
        <DecorativeShapes variant="minimal" />
        <div className="relative z-10 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-xl bg-[var(--current-theme-color-300)] flex items-center justify-center shadow-sm">
              <Icon icon="lightbulb" size={28} className="" />
            </div>
            <div>
              <Heading1 className="text-[var(--current-theme-color-900)]">Spørsmål og svar</Heading1>
              <Body1 className="text-[var(--current-theme-color-800)]">
                {faqs.length} vanlige spørsmål
              </Body1>
            </div>
          </div>
          <Body1 className="mt-4 max-w-2xl ">
            Her finner du svar på vanlige spørsmål fra trenere om Flyt Idrett, metoder og praktisk gjennomføring.
          </Body1>
        </div>
      </header>

      {/* Quick tip */}
      <div 
        className="mb-8 p-4 rounded-lg bg-[var(--current-theme-color-200)]/50 flex items-center gap-3 animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <Icon icon="lightbulb" size={20} className="text-[var(--current-theme-color-800)] flex-shrink-0" />
        <Body1 className="text-sm text-[var(--current-theme-color-800)]">
          Klikk på et spørsmål for å se svaret. Finner du ikke det du leter etter? Kontakt oss!
        </Body1>
      </div>

      {/* FAQs */}
      {faqs.length > 0 ? (
        <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <Accordion items={faqs} />
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--current-theme-color-200)] mb-4">
            <Icon icon="lightbulb" size={32} className="text-[var(--current-theme-color-500)]" />
          </div>
          <Body1 className="text-[var(--current-theme-color-800)]">
            Ingen spørsmål tilgjengelig ennå.
          </Body1>
          <p className="mt-2 text-sm text-[var(--current-theme-color-500)]">
            Sjekk tilbake snart for nytt innhold.
          </p>
        </div>
      )}

      {/* PDF Download */}
      <div className="mt-10" style={{ animationDelay: "0.25s" }}>
        <PdfDownload 
          pdfFile={section?.pdfFile}
          title="Last ned PDF"
          description="Full dokumentasjon med alle spørsmål og svar"
        />
      </div>

      {/* Contact CTA */}
      <section className="mt-12 py-8 px-6 rounded-xl bg-[var(--current-theme-color-200)] text-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <h3 className="text-lg font-semibold mb-2">
          Har du et spørsmål som ikke er besvart?
        </h3>
        <Body1 className="text-[var(--current-theme-color-800)] mb-4">
          Vi hjelper deg gjerne med spørsmål om Flyt Idrett.
        </Body1>
        <a 
          href="mailto:kontakt@flytidrett.no"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--current-theme-color-500)] text-white font-medium hover:bg-[var(--current-theme-color-600)] transition-colors"
        >
          <Icon icon="email" size={18} />
          Send oss en e-post
        </a>
      </section>
    </>
  );
}
