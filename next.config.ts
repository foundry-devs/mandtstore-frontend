import type { NextConfig } from "next";

// Normal builds support a Next.js server. Sites uses the static export option.
const staticExport = process.env.NEXT_STATIC_EXPORT === "1";

const config: NextConfig = {
  ...(staticExport ? { output: "export" as const, trailingSlash: true } : {}),
  images: { unoptimized: staticExport },
  poweredByHeader: false,
};

export default config;
