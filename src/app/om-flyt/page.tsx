import { client } from "@/lib/sanity";
import { OM_FLYT_QUERY } from "@/lib/queries";
import { Layout } from "@/components/Layout";
import { BlockContent } from "@/components/BlockContent";
import { Heading1 } from "@/components/Typography";
import { getPageColor } from "@/lib/helpers";
import styles from "./OmFlyt.module.css";

async function getOmFlytData() {
  return await client.fetch(OM_FLYT_QUERY);
}

export default async function OmFlytPage() {
  const data = await getOmFlytData();
  const themeColor = getPageColor("/om-flyt");

  return (
    <Layout themeColor={themeColor}>
      <div className={styles.omFlyt}>
        <Heading1>{data.title}</Heading1>
        {data.content && <BlockContent blocks={data.content} />}
      </div>
    </Layout>
  );
}

