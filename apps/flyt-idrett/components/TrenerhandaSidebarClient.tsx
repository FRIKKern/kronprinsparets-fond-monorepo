"use client";

import { TrenerhandaSidebar } from "./TrenerhandaSidebar";
import { MobileSidebarDrawer } from "./MobileSidebarDrawer";

type Lesson = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: { current: string };
};

type TrenerhandaSidebarClientProps = {
  lessons: Lesson[];
};

export function TrenerhandaSidebarClient({ lessons }: TrenerhandaSidebarClientProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <TrenerhandaSidebar lessons={lessons} />
      
      {/* Mobile drawer toggle */}
      <MobileSidebarDrawer title="Trenerhånda">
        <TrenerhandaSidebar lessons={lessons} />
      </MobileSidebarDrawer>
    </>
  );
}

