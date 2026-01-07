import { client, findOrCreateDocument } from "./sanityClient";

export async function seedVideos(sectionIds: Record<string, string>) {
  console.log("🌱 Seeding Videos...");

  const handbokaId = sectionIds["handboka"];
  if (!handbokaId) {
    console.log("⚠️  Handboka section not found, skipping videos");
    return;
  }

  const videos = [
    {
      _type: "video",
      title: "Introduksjon til FLYT Idrett",
      description: "En introduksjon til FLYT Idrett og hvordan plattformen fungerer.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder - replace with actual video
      category: "Introduksjon",
    },
    {
      _type: "video",
      title: "Styrkebasert tenkesett",
      description: "Lær om styrkebasert tenkesett og hvordan det kan brukes i idrettsmiljøet.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder - replace with actual video
      category: "Metodikk",
    },
    {
      _type: "video",
      title: "Anerkjennende kommunikasjon",
      description: "Hvordan kommunisere på en anerkjennende måte med idrettsutøvere.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder - replace with actual video
      category: "Metodikk",
    },
  ];

  const videoIds: string[] = [];

  for (const video of videos) {
    const id = await findOrCreateDocument(
      "video",
      `title == "${video.title}"`,
      video
    );
    videoIds.push(id);
  }

  console.log("✅ Videos seeded");
  return videoIds;
}

