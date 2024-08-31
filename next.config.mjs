import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
  i18n: {
    locales: ["en", "id"],
    defaultLocale: "en",
  },
};

export default withContentlayer(nextConfig);
