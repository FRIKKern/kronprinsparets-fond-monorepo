import { Icon } from "./Icon";

type Props = {
  file: {
    title: string;
    file: {
      asset: {
        url: string;
        extension: string;
      };
    };
  };
};

export function FileDownload({ file }: Props) {
  const { title, file: fileAsset } = file;
  if (!fileAsset?.asset?.url) return null;

  const { url, extension } = fileAsset.asset;

  return (
    <a
      href={`${url}?dl=${title}.${extension}`}
      className="inline-flex items-center gap-2 underline underline-offset-2"
    >
      <Icon icon="file" size={18} />
      <span>{title}</span>
    </a>
  );
}

