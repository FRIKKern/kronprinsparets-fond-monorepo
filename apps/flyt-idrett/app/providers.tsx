"use client";

import { useEffect } from "react";
import { configureSanityImage } from "@kpf/ui";
import { client } from "@/lib/sanity";

// Base UI from @base-ui-components/react is unstyled and doesn't require a provider
// This file is kept for any future context providers needed

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure Sanity image builder is configured
    configureSanityImage(client);
  }, []);

  return <>{children}</>;
}
