import { BlockContent } from "./BlockContent";
import { Subtitle2 } from "./Typography";

type Props = {
  content?: {
    importantMessageTitle?: string;
    importantMessage?: any;
    showImportantMessage?: boolean;
  };
  oldMessage?: boolean;
};

export function ImportantMessage({ content, oldMessage }: Props) {
  const { importantMessageTitle, importantMessage, showImportantMessage } =
    content || {};

  if (oldMessage) {
    return (
      <div className="bg-[var(--current-theme-color-200)] text-[var(--current-theme-color-700)] p-4 my-12">
        <Subtitle2>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--current-theme-color-100)] text-[var(--current-theme-color-800)] border border-[var(--current-theme-color-600)] mr-2">
            i
          </span>
          Denne gruppen er over 1 år gammel
        </Subtitle2>
      </div>
    );
  } else if (showImportantMessage) {
    return (
      <div className="bg-[var(--color-halm-100)] text-[var(--color-halm-900)] p-4 my-12">
        <Subtitle2>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-halm-200)] text-[var(--color-halm-800)] border border-[var(--color-halm-600)] mr-2">
            i
          </span>
          {importantMessageTitle}
        </Subtitle2>
        <div className="[&_p]:mt-2">
          <BlockContent blocks={importantMessage} />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

