import Image from "next/image";
import type { Product } from "@/lib/catalogue";

export function ProductPhoto({ product }: { product: Product }) {
  const { src, alt, quadrant } = product.image;
  if (quadrant === undefined)
    return (
      <span className="catalogue-shot">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 600px) 50vw, 25vw"
          className="individual-product-photo"
        />
      </span>
    );
  return (
    <span className={`catalogue-shot shot-${quadrant}`}>
      <svg
        className="product-visual"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={alt}
      >
        <image
          href={src}
          x={quadrant % 2 ? -100 : 0}
          y={quadrant >= 2 ? -100 : 0}
          width="200"
          height="200"
        />
      </svg>
    </span>
  );
}
