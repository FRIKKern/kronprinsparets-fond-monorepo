import imageUrlBuilder from "@sanity/image-url";
import type { SanityClient } from "@sanity/client";

let builder: ReturnType<typeof imageUrlBuilder> | null = null;

export function configureSanityImage(client: SanityClient) {
  builder = imageUrlBuilder(client);
}

export function urlFor(source: any) {
  if (!builder) {
    throw new Error(
      "Sanity image builder not configured. Call configureSanityImage() first."
    );
  }
  return builder.image(source);
}

