import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.56.1"],
  images: {
    /* Trim the default srcset candidate lists: with the archive's `sizes`
     * values (card 316-571px CSS, modal 768px, gallery 108px) the dropped
     * widths (16-96, 2048) can never be selected by any browser, yet each
     * candidate adds ~90 bytes to the SSR HTML for every image tag.
     * Every reachable size maps to a kept candidate:
     *   card  -> 327/346/571px @1x, 654/692/1143 @2x, 981/1714 @3x
     *   modal -> 768 @1x, 1536 @2x, 2304 @3x (falls back to 3840)
     *   strip -> 108 @1x, 216 @2x, 324 @3x */
    imageSizes: [128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 3840],
    /* WebP only — no formats/quality overrides; optimizer stays on its
     * defaults so Vercel serves responsive variants unchanged. */
  },
};

export default nextConfig;
