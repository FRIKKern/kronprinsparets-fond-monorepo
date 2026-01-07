import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { configureSanityImage } from "@kpf/ui";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable. Please add it to your .env.local file."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_READ_TOKEN,
});

const builder = imageUrlBuilder(client);

// Configure shared UI package's Sanity image builder
configureSanityImage(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export function buildImageUrl(image: any, width = 800) {
  if (!image?.asset) return null;
  return urlFor(image).width(width).auto("format").url();
}

export function buildPdfUrl(pdfFile: any): string | null {
  if (!pdfFile?.asset?._ref) return null;
  
  // Sanity file URL pattern: https://cdn.sanity.io/files/{projectId}/{dataset}/{assetId}.{extension}
  const assetId = pdfFile.asset._ref.replace("file-", "");
  const extension = pdfFile.asset.extension || "pdf";
  
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;
}

