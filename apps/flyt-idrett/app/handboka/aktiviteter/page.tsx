import { client } from "@/lib/sanity";
import { ALL_ACTIVITIES_QUERY } from "@/lib/queries";
import { ActivityCard } from "@/components/ActivityCard";
import { DecorativeShapes } from "@/components/DecorativeShapes";
import { Icon } from "@/components/Icon";
import { Heading1, Body1 } from "@kpf/ui";

async function getAllActivities() {
  const activities = await client.fetch(ALL_ACTIVITIES_QUERY);
  return activities || [];
}

const categoryConfig: Record<string, { label: string; icon: string; description: string }> = {
  samarbeid: {
    label: "Samarbeid",
    icon: "users",
    description: "Aktiviteter som fremmer samarbeid og teamwork",
  },
  vennskap: {
    label: "Vennskap", 
    icon: "heart",
    description: "Aktiviteter som bygger vennskap og tilhørighet",
  },
  selvfolelse: {
    label: "Selvfølelse",
    icon: "star",
    description: "Aktiviteter som styrker selvtillit og mestringsfølelse",
  },
  kommunikasjon: {
    label: "Kommunikasjon",
    icon: "lightbulb",
    description: "Aktiviteter som utvikler kommunikasjonsferdigheter",
  },
};

export const revalidate = 30;

export default async function AktiviteterPage() {
  const activities = await getAllActivities();

  type Activity = {
    _id: string;
    title: string;
    category: string;
    slug: { current: string };
    shortDescription?: string;
    duration?: string;
    purpose?: string;
  };

  const categories = ["samarbeid", "vennskap", "selvfolelse", "kommunikasjon"];
  const activitiesByCategory = categories.reduce((acc, cat) => {
    acc[cat] = activities.filter((a: Activity) => a.category === cat);
    return acc;
  }, {} as Record<string, Activity[]>);

  const totalCount = activities.length;

  return (
    <>
      {/* Breadcrumbs */}
      {/* <Breadcrumbs
        items={[
          { label: "Håndboka", href: "/handboka" },
          { label: "Aktiviteter" },
        ]}
      /> */}

      {/* Header */}
      <header className="relative py-10 mb-10">
        <DecorativeShapes variant="minimal" />
        <div className="relative z-10 animate-fade-in-up pt-0 pb-0">
          <Heading1 className="text-[var(--current-theme-color-900)] mb-4">Aktiviteter</Heading1>
          <Body1 className="text-lg text-black max-w-2xl">
            {totalCount} aktiviteter som styrker samarbeid, vennskap, selvfølelse og kommunikasjon
          </Body1>
        </div>
      </header>

      {/* Category quick links */}
      <nav className="flex flex-wrap gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        {categories.map((category) => {
          const config = categoryConfig[category];
          const count = activitiesByCategory[category]?.length || 0;
          if (count === 0) return null;
          
          return (
            <a
              key={category}
              href={`#${category}`}
              className="group inline-flex items-center gap-3 px-1.5 py-3 rounded-xl bg-white/80 hover:bg-[var(--current-theme-color-100)] border border-[var(--current-theme-color-200)] hover:border-[var(--current-theme-color-300)] transition-all duration-200 text-sm font-medium shadow-sm hover:shadow"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--current-theme-color-100)] group-hover:bg-[var(--current-theme-color-200)] transition-colors">
                <Icon icon={config.icon} size={16} strokeWidth={1.5} className="text-[var(--current-theme-color-700)]" />
              </span>
              <span className="text-[var(--current-theme-color-800)]">{config.label}</span>
              <span className="text-xs text-[var(--current-theme-color-500)] bg-[var(--current-theme-color-100)] px-2 py-0.5 rounded-full">
                {count}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Categories */}
      {categories.map((category, catIndex) => {
        const categoryActivities = activitiesByCategory[category];
        const config = categoryConfig[category];
        if (!categoryActivities || categoryActivities.length === 0) return null;

        return (
          <section 
            key={category} 
            id={category}
            className="mb-16 animate-fade-in-up scroll-mt-24"
            style={{ animationDelay: `${0.2 + catIndex * 0.1}s` }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--current-theme-color-300)] flex items-center justify-center shadow-sm">
                <Icon icon={config.icon} size={24} strokeWidth={1.5} className="text-[var(--current-theme-color-900)]" />
              </div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-bold text-[var(--current-theme-color-900)]">
                  {config.label}
                </h2>
                <span className="text-sm text-[var(--current-theme-color-800)] font-medium">
                  {categoryActivities.length} aktiviteter
                </span>
              </div>
            </div>
            <p className="text-[var(--current-theme-color-900)] mb-8 ml-16 text-base">
              {config.description}
            </p>
            
            {/* Activity Cards Grid - 2 columns for larger cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categoryActivities.map((activity: Activity, index: number) => (
                <ActivityCard
                  key={activity._id}
                  title={activity.title}
                  shortDescription={activity.shortDescription}
                  duration={activity.duration}
                  purpose={activity.purpose}
                  category={activity.category}
                  href={`/handboka/aktiviteter/${activity.slug.current}`}
                  index={index}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* Empty state */}
      {totalCount === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--current-theme-color-200)] mb-4">
            <Icon icon="users" size={32} className="text-[var(--current-theme-color-500)]" />
          </div>
          <Body1 className="text-[var(--current-theme-color-800)]">
            Ingen aktiviteter tilgjengelig ennå.
          </Body1>
        </div>
      )}
    </>
  );
}
