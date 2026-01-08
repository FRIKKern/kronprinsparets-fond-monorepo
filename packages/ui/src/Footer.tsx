type FooterProps = {
  contactLabel?: string;
  contactName?: string;
  contactEmail?: string;
};

export function Footer({
  contactLabel = "Kontaktperson:",
  contactName = "Silje Mørtvedt",
  contactEmail = "silje@kppfond.no",
}: FooterProps = {}) {
  return (
    <footer className="absolute bottom-0 left-0 w-full h-[var(--footer-height)] flex items-center justify-center px-[var(--page-horizontal-padding)] pb-6 bg-[var(--color-skifer-800)]">
      <p className="text-sm text-[var(--color-skifer-300)]">
        {contactLabel} {contactName} — <a href={`mailto:${contactEmail}`} className="underline hover:text-[var(--color-skifer-100)] transition-colors">{contactEmail}</a>
      </p>
    </footer>
  );
}

