import { PortableText, PortableTextComponents } from "@portabletext/react";
import { SanityImage } from "./SanityImage";
import { ListView } from "./ListView";
import { FileDownload } from "./FileDownload";
import Link from "next/link";
import styles from "./BlockContent.module.css";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => <SanityImage image={value} />,
    fileUpload: ({ value }) => <FileDownload file={value} />,
    listView: ({ value }) => <ListView items={value.list || value.items || []} />,
  },
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      if (href.startsWith("/")) {
        return (
          <Link
            href={href}
            className="underline underline-offset-2"
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          {children}
        </a>
      );
    },
  },
};

export function BlockContent({ blocks }: { blocks: any }) {
  if (!blocks) return null;
  return (
    <div className={styles.blockContentWrapper}>
      <PortableText value={blocks} components={components} />
    </div>
  );
}

