export type IconName =
  | "arrow"
  | "diagonal"
  | "search"
  | "heart"
  | "bag"
  | "plus"
  | "close"
  | "check"
  | "sun"
  | "flower"
  | "box"
  | "menu"
  | "copy";

/** Renders a symbol from <IconSprite />. Size it with size-* utilities. */
export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg aria-hidden="true" className={className}>
      <use href={`#i-${name}`} />
    </svg>
  );
}

/** Inline SVG sprite; render once per page. */
export function IconSprite() {
  return (
    <svg
      className="absolute size-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </symbol>
        <symbol id="i-diagonal" viewBox="0 0 24 24">
          <path d="M6 18 18 6M6 6h12v12" />
        </symbol>
        <symbol id="i-search" viewBox="0 0 24 24">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 5 5" />
        </symbol>
        <symbol id="i-heart" viewBox="0 0 24 24">
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
        </symbol>
        <symbol id="i-bag" viewBox="0 0 24 24">
          <path d="M5 7h14l1 14H4L5 7Z" />
          <path d="M8 8V6a4 4 0 0 1 8 0v2" />
        </symbol>
        <symbol id="i-plus" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" />
        </symbol>
        <symbol id="i-close" viewBox="0 0 24 24">
          <path d="m6 6 12 12M6 18 18 6" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="m5 12 4 4L19 6" />
        </symbol>
        <symbol id="i-sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
        </symbol>
        <symbol id="i-flower" viewBox="0 0 24 24">
          <path d="M12 9C3-2 1 12 9 12c-11 9 3 11 3 3 9 11 11-3 3-3C26 3 12 1 12 9Z" />
          <circle cx="12" cy="12" r="2" />
        </symbol>
        <symbol id="i-box" viewBox="0 0 24 24">
          <path d="m3 7 9-5 9 5v10l-9 5-9-5V7Zm0 0 9 5 9-5M12 12v10M7 4.8 16 10" />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </symbol>
        <symbol id="i-copy" viewBox="0 0 24 24">
          <rect x="8" y="8" width="12" height="13" rx="2" />
          <path d="M16 8V3H3v13h5" />
        </symbol>
      </defs>
    </svg>
  );
}
