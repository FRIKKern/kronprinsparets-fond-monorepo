import { client } from "@/lib/sanity";
import { CONTACT_PAGE_QUERY, ALL_EMPLOYEES_QUERY } from "@/lib/queries";
import { Layout } from "@/components/Layout";
import { Heading1, Heading5 } from "@/components/Typography";
import { BlockContent } from "@/components/BlockContent";
import { Employee } from "@/components/Employee";
import { FlytEmployeeList } from "@/components/FlytEmployeeList";
import { Input } from "@/components/Input";
import { ContactSearch } from "@/components/ContactSearch";
import { getPageColor } from "@/lib/helpers";

async function getContactData() {
  const [contactPage, allEmployees] = await Promise.all([
    client.fetch(CONTACT_PAGE_QUERY),
    client.fetch(ALL_EMPLOYEES_QUERY),
  ]);

  return { contactPage, allEmployees };
}

export default async function ContactPage() {
  const { contactPage, allEmployees } = await getContactData();
  const themeColor = getPageColor("/kontakt");

  return (
    <Layout themeColor={themeColor} standardPadding maxWidth>
      <Heading1>{contactPage.title}</Heading1>
      <BlockContent blocks={contactPage.description} />
      <br />
      <div className="space-y-6 my-8">
        {contactPage.employees.map((employee: any, index: number) => (
          <Employee {...employee} key={`employee-${index}`} />
        ))}
      </div>
      <Heading5>Flyt-ledere</Heading5>
      <br />
      <ContactSearch allEmployees={allEmployees} />
    </Layout>
  );
}

