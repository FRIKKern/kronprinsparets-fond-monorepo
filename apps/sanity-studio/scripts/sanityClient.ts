import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables - try multiple locations
const envPaths = [
  resolve(__dirname, "../.env.local"),
  resolve(__dirname, "../.env"),
  resolve(process.cwd(), ".env.local"),
  resolve(process.cwd(), ".env"),
];

for (const envPath of envPaths) {
  dotenv.config({ path: envPath });
}

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_STUDIO_API_TOKEN || process.env.SANITY_READ_TOKEN;

if (!projectId) {
  throw new Error("Missing SANITY_PROJECT_ID environment variable");
}

if (!token) {
  throw new Error("Missing SANITY_API_TOKEN environment variable. You need a write token to create documents.");
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

// Helper function to create slug from title
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Helper function to find or create document
export async function findOrCreateDocument(
  type: string,
  filter: string,
  document: any
): Promise<string> {
  const existing = await client.fetch(`*[_type == "${type}" && ${filter}][0]`);
  
  if (existing) {
    console.log(`Found existing ${type}: ${existing.title || existing._id}`);
    return existing._id;
  }

  const created = await client.create(document);
  console.log(`Created ${type}: ${document.title || created._id}`);
  return created._id;
}

