import Image from "next/image";

export function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 w-full h-[var(--footer-height)] flex items-center justify-center bg-[var(--color-skifer-800)] text-[var(--color-skifer-100)]">
      <a
        href="https://kronprinsparetsfond.no"
        aria-label="Kronprinsparets fond"
      >
        <Image
          src="/kppfLogo.svg"
          alt="Kronprinsparets fond logo"
          width={120}
          height={40}
        />
      </a>
    </footer>
  );
}

