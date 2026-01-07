import { client } from "@/lib/sanity";
import { CONTACT_PAGE_QUERY } from "@/lib/queries";
import { Layout } from "@/components/Layout";
import { KommuneNotFound } from "@/components/KommuneNotFound";
import { getPageColor } from "@/lib/helpers";

async function getMainEmployee() {
  const contactPage = await client.fetch(CONTACT_PAGE_QUERY);
  return contactPage.employees?.[0];
}

export default async function KommuneNotFoundPage() {
  const mainEmployee = await getMainEmployee();
  const themeColor = getPageColor("/har-ikke-flyt-enda");

  // Note: In a real implementation, you'd get kommuneName from search params or route params
  // For now, using a placeholder
  const kommuneName = "denne";

  return (
    <Layout themeColor={themeColor} standardPadding maxWidth>
      <KommuneNotFound mainEmployee={mainEmployee} kommuneName={kommuneName} />
    </Layout>
  );
}

