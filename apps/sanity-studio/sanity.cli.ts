import { defineCliConfig } from "sanity/cli";
import { config } from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";

// Load .env.local file if it exists (CLI runs in Node.js, so we can use dotenv)
// Try multiple possible locations
const possiblePaths = [
  resolve(process.cwd(), ".env.local"),
  resolve(process.cwd(), "apps", "sanity-studio", ".env.local"),
  ".env.local",
];

for (const envPath of possiblePaths) {
  if (existsSync(envPath)) {
    config({ path: envPath });
    break;
  }
}

// For CLI, we can use process.env directly (runs in Node.js)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";

if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable. Please add it to your .env.local file."
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});

