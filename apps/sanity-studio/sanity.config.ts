import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
import { deskStructure } from "./deskStructure";

// Sanity Studio runs in browser via Vite, so we need to use import.meta.env
// Sanity Studio exposes env vars with SANITY_STUDIO_ prefix via import.meta.env
// Vite also exposes VITE_ prefixed vars
const projectId = 
  (typeof import.meta !== "undefined" && import.meta.env?.SANITY_STUDIO_PROJECT_ID) ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SANITY_PROJECT_ID) ||
  (typeof import.meta !== "undefined" && import.meta.env?.NEXT_PUBLIC_SANITY_PROJECT_ID) ||
  (typeof process !== "undefined" && process.env?.SANITY_STUDIO_PROJECT_ID) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SANITY_PROJECT_ID) ||
  (typeof process !== "undefined" && process.env?.VITE_SANITY_PROJECT_ID);

const dataset = 
  (typeof import.meta !== "undefined" && import.meta.env?.SANITY_STUDIO_DATASET) ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SANITY_DATASET) ||
  (typeof import.meta !== "undefined" && import.meta.env?.NEXT_PUBLIC_SANITY_DATASET) ||
  (typeof process !== "undefined" && process.env?.SANITY_STUDIO_DATASET) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SANITY_DATASET) ||
  (typeof process !== "undefined" && process.env?.VITE_SANITY_DATASET) ||
  "production";

const token = 
  (typeof import.meta !== "undefined" && import.meta.env?.SANITY_STUDIO_API_TOKEN) ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SANITY_STUDIO_API_TOKEN) ||
  (typeof process !== "undefined" && process.env?.SANITY_STUDIO_API_TOKEN) ||
  (typeof process !== "undefined" && process.env?.VITE_SANITY_STUDIO_API_TOKEN);

if (!projectId) {
  throw new Error(
    "Missing SANITY_PROJECT_ID environment variable. Please add SANITY_STUDIO_PROJECT_ID, NEXT_PUBLIC_SANITY_PROJECT_ID, or VITE_SANITY_PROJECT_ID to your .env or .env.local file."
  );
}

export default defineConfig({
  name: "default",
  title: "FLYT Idrett Studio",
  projectId,
  dataset,
  token,
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});

