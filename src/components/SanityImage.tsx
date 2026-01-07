import Image from "next/image";
import { urlFor } from "@/lib/sanity";

type Props = {
  image: any;
  width?: number;
  alt?: string;
  className?: string;
};

export function SanityImage({ image, width = 800, alt = "", className }: Props) {
  if (!image?.asset) return null;

  // Handle both reference (_ref) and dereferenced (_id, url) asset structures
  let imageObj: any;
  
  if (image.asset._ref) {
    // Reference format: { asset: { _ref: "..." } }
    imageObj = {
      asset: {
        _ref: image.asset._ref,
      },
    };
  } else if (image.asset._id) {
    // Dereferenced format: { asset: { _id: "...", url: "..." } }
    // urlFor can work with _id directly
    imageObj = {
      asset: {
        _id: image.asset._id,
      },
    };
  } else {
    // Fallback: try to use the image object directly
    imageObj = image;
  }
  
  if (image.crop) imageObj.crop = image.crop;
  if (image.hotspot) imageObj.hotspot = image.hotspot;

  const imageUrl = urlFor(imageObj).width(width).auto("format").url();

  // Calculate hotspot-based object-position if available
  const objectPosition = image.hotspot
    ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
    : "center";

  // For CircleImages, use fill mode to fill the container
  const useFill = className?.includes("w-full") && className?.includes("h-full");
  
  if (useFill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={className}
        style={{ objectPosition, objectFit: "cover" }}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={width}
      className={className}
      style={{ objectPosition }}
    />
  );
}

