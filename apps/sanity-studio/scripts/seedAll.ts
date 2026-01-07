#!/usr/bin/env node

import { seedSiteSettings } from "./seedSiteSettings";
import { seedSections } from "./seedSections";
import { seedLessons } from "./seedLessons";
import { seedActivities } from "./seedActivities";
import { seedGames } from "./seedGames";
import { seedVideos } from "./seedVideos";
import { seedFAQs } from "./seedFAQs";

async function seedAll() {
  console.log("🚀 Starting Sanity content seeding...\n");

  try {
    // 1. Seed Site Settings (creates the singleton without references first)
    await seedSiteSettings();
    console.log("");

    // 2. Seed Sections (Trenerhanda, Handboka, etc.)
    const sectionIds = await seedSections();
    console.log("");

    // 3. Update Site Settings with section references
    await seedSiteSettings(sectionIds);
    console.log("");

    // 4. Seed Lessons (for Trenerhanda)
    await seedLessons(sectionIds);
    console.log("");

    // 5. Seed Activities (for Handboka)
    await seedActivities(sectionIds);
    console.log("");

    // 6. Seed Games (for Lekebank)
    await seedGames(sectionIds);
    console.log("");

    // 7. Seed Videos (for Filmer)
    await seedVideos(sectionIds);
    console.log("");

    // 8. Seed FAQs
    await seedFAQs();
    console.log("");

    console.log("✅ All content seeded successfully!");
    console.log("\n💡 Tips:");
    console.log("   - Check your Sanity Studio to see the new content");
    console.log("   - Update video URLs with actual YouTube links");
    console.log("   - Add more content as needed");
  } catch (error) {
    console.error("❌ Error seeding content:", error);
    process.exit(1);
  }
}

seedAll();

