import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Use stable turbopack configuration
  // turbopack: {}
  // Optionally, add any other Next.js config below
};
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
 
export default withContentlayer(withMDX(nextConfig));
