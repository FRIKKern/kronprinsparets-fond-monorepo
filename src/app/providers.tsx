"use client";

// Base UI from @base-ui-components/react is unstyled and doesn't require a provider
// This file is kept for any future context providers needed

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
