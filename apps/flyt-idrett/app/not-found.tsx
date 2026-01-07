import { Layout } from "@/components/Layout";
import { getPageColor } from "@/lib/helpers";
import { Heading1 } from "@kpf/ui";

export default function NotFound() {
  const themeColor = getPageColor("/404");
  return (
    <Layout themeColor={themeColor} standardPadding maxWidth>
      <Heading1>404: Not Found</Heading1>
      <p>Denne siden finnes ikke lenger</p>
    </Layout>
  );
}

