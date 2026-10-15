import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Product } from "../types";

// Zooms gently while an ancestor marked group/card is hovered.
const zoom = "transition-transform duration-600 group-hover/card:scale-[1.045]";

export function ProductPhoto({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { src, alt, quadrant } = product.image;
  return (
    <span className={cn("relative block size-full overflow-hidden", className)}>
      {quadrant === undefined ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 600px) 50vw, 25vw"
          className={cn("object-cover", zoom)}
        />
      ) : (
        // One shared 2×2 photo sheet; show the requested quarter.
        <svg
          className={cn("block size-full stroke-none", zoom)}
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
      )}
    </span>
  );
}
