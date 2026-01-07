import { SanityImage } from "./SanityImage";
import { cn } from "@/lib/helpers";
import styles from "./CircleImages.module.css";

type Props = {
  images: any[] | any;
  layout: 1 | 2 | 3;
};

export function CircleImages({ images, layout }: Props) {
  if (!images) return null;

  let circles: (any | null)[] = [];

  switch (layout) {
    case 1:
      circles = [null, images[0], images[1]];
      break;
    case 2:
      // Layout 2: [null, singleImage]
      circles = [null, images];
      break;
    case 3:
      // Layout 3: array of images
      circles = Array.isArray(images) ? images : [images];
      break;
  }

  return (
    <div className={cn(styles.circleImages, styles[`layout${layout}`])}>
      {circles.map((image, index) =>
        image ? (
          <div key={`circle-image-${index}`}>
            <SanityImage
              image={image}
              alt="Bilde fra Flyt-programmet"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div key={`circle-image-${index}`} className={styles.filled} />
        )
      )}
    </div>
  );
}

