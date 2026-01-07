import { Icon } from "./Icon";
import { Body1 } from "@kpf/ui";
import { cn } from "@/lib/helpers";
import { buildPdfUrl } from "@/lib/sanity";

type PdfFile = {
  asset?: {
    _ref: string;
    _type: string;
    extension?: string;
  };
};

type PdfDownloadProps = {
  pdfFile?: PdfFile | null;
  title?: string;
  description?: string;
  className?: string;
};

export function PdfDownload({ 
  pdfFile, 
  title = "Last ned PDF",
  description = "Full dokumentasjon",
  className 
}: PdfDownloadProps) {
  const pdfUrl = pdfFile ? buildPdfUrl(pdfFile) : null;

  if (!pdfUrl) return null;

  return (
    <div className={cn(
      "p-6 rounded-xl bg-[var(--current-theme-color-200)] animate-fade-in-up",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon icon="fileText" size={24} className="" />
          <div>
            <Body1 className="font-semibold ">
              {title}
            </Body1>
            <p className="text-sm text-[var(--current-theme-color-800)]">
              {description}
            </p>
          </div>
        </div>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--current-theme-color-700)] text-white font-medium hover:bg-[var(--current-theme-color-800)] transition-colors"
        >
          Last ned
          <Icon icon="download" size={16} />
        </a>
      </div>
    </div>
  );
}

