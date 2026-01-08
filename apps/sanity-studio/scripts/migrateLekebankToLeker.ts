#!/usr/bin/env node

import { client } from "./sanityClient";

async function migrateLekebankToLeker() {
  console.log("🔄 Migrating lekebank section to leker...");

  try {
    // Find the section with slug "lekebank"
    const section = await client.fetch(
      `*[_type == "section" && slug.current == "lekebank"][0]{ _id, title, slug }`
    );

    if (!section) {
      console.log("⚠️  No section with slug 'lekebank' found. It may already be migrated.");
      
      // Check if leker exists
      const lekerSection = await client.fetch(
        `*[_type == "section" && slug.current == "leker"][0]{ _id, title }`
      );
      
      if (lekerSection) {
        console.log("✅ Section with slug 'leker' already exists:", lekerSection.title);
      }
      return;
    }

    console.log(`Found section: ${section.title} (${section._id})`);
    console.log(`Current slug: ${section.slug.current}`);

    // Update the slug to "leker" and title to "Leker"
    await client
      .patch(section._id)
      .set({
        slug: { current: "leker", _type: "slug" },
        title: "Leker",
      })
      .commit();

    console.log("✅ Successfully migrated section slug from 'lekebank' to 'leker'");
    console.log("✅ Updated title to 'Leker'");
  } catch (error) {
    console.error("❌ Error migrating section:", error);
    process.exit(1);
  }
}

migrateLekebankToLeker()
  .then(() => {
    console.log("🎉 Migration complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  });

