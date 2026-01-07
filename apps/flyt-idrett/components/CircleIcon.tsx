import { Icon } from "@kpf/ui";

type CircleIconProps = {
  children: React.ReactNode;
  href: string;
};

function CircleIcon({ children, href }: CircleIconProps) {
  return (
    <a
      href={href}
      className="w-8 h-8 rounded-full bg-[var(--current-theme-color-300)] flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 my-2 mr-2 ml-0"
    >
      {children}
    </a>
  );
}

export function PhoneIcon({ phone }: { phone?: string }) {
  if (!phone) return null;
  return (
    <CircleIcon href={`tel:+47${phone}`}>
      <Icon icon="phone" size={18} />
    </CircleIcon>
  );
}

export function EmailIcon({ email }: { email?: string }) {
  if (!email) return null;
  return (
    <CircleIcon href={`mailto:${email}`}>
      <Icon icon="email" size={24} />
    </CircleIcon>
  );
}

