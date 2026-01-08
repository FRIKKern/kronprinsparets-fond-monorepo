export function Footer() {
  return (
    <footer className="absolute bottom-0 pb-4 left-0 w-full h-[var(--footer-height)] flex items-center justify-center px-[var(--page-horizontal-padding)] pb-6 bg-[var(--color-skifer-800)]">
      <p className="text-sm text-[var(--color-skifer-300)]">
        Kontaktperson: Silje Mørtvedt — <a href="mailto:silje@kppfond.no" className="underline hover:text-[var(--color-skifer-100)] transition-colors">silje@kppfond.no</a>
      </p>
    </footer>
  );
}

