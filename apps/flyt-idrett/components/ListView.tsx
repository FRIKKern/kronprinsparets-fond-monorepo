import { SanityImage, BlockContent } from "@kpf/ui";

type ListItemProps = {
  title: string;
  text: any;
  image: any;
};

function ListItem({ title, text, image }: ListItemProps) {
  return (
    <div className="grid items-center mb-8 max-[900px]:[&_img]:order-1 max-[900px]:[&_.text]:order-2 min-[901px]:grid-cols-[1fr_300px] min-[901px]:gap-8">
      <div className="text">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <BlockContent blocks={text} />
      </div>
      {image && (
        <div>
          <SanityImage image={image} width={300} className="block max-w-[300px] max-h-[300px] w-full object-contain my-4" />
        </div>
      )}
    </div>
  );
}

type Props = {
  items: Array<{
    title: string;
    text: any;
    image: any;
    _key: string;
  }>;
};

export function ListView({ items }: Props) {
  return (
    <div className="my-8">
      {items.map((item) => (
        <ListItem
          key={item._key}
          title={item.title}
          text={item.text}
          image={item.image}
        />
      ))}
    </div>
  );
}

