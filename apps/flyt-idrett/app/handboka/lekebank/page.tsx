import { client } from "@/lib/sanity";
import { ALL_GAMES_QUERY } from "@/lib/queries";
import { GameCard } from "@/components/GameCard";
import { DecorativeShapes } from "@/components/DecorativeShapes";
import { Icon } from "@/components/Icon";
import { Heading1, Body1 } from "@kpf/ui";

async function getAllGames() {
  const games = await client.fetch(ALL_GAMES_QUERY);
  return games || [];
}

type Game = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: unknown;
};

export default async function LekebankPage() {
  const games = await getAllGames();

  return (
    <>
      {/* Breadcrumbs */}
      {/* <Breadcrumbs
        items={[
          { label: "Håndboka", href: "/handboka" },
          { label: "Lekebank" },
        ]}
      /> */}

      {/* Header */}
      <header className="relative py-8 mb-8">
        <DecorativeShapes variant="minimal" />
        <div className="relative z-10 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-xl bg-[var(--current-theme-color-300)] flex items-center justify-center shadow-sm">
              <Icon icon="star" size={28} className="" />
            </div>
            <div>
              <Heading1 className="text-[var(--current-theme-color-900)]">Lekebank</Heading1>
              <Body1 className="text-[var(--current-theme-color-800)]">
                {games.length} raske leker med lav terskel
              </Body1>
            </div>
          </div>
          <Body1 className="mt-4 max-w-2xl ">
            En samling enkle og morsomme leker som kan brukes til oppvarming, pauser eller avslutning. 
            Ingen kompliserte regler – bare lek!
          </Body1>
        </div>
      </header>

      {/* Games Grid */}
      {games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {games.map((game: Game, index: number) => (
            <GameCard
              key={game._id}
              title={game.title}
              description={game.description}
              href={`/handboka/lekebank/${game.slug.current}`}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--current-theme-color-200)] mb-4">
            <Icon icon="star" size={32} className="text-[var(--current-theme-color-500)]" />
          </div>
          <Body1 className="text-[var(--current-theme-color-800)]">
            Ingen leker tilgjengelig ennå.
          </Body1>
          <p className="mt-2 text-sm text-[var(--current-theme-color-500)]">
            Sjekk tilbake snart for nytt innhold.
          </p>
        </div>
      )}
    </>
  );
}
