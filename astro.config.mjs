import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { loadEnv } from "vite";
import partytown from '@astrojs/partytown'
import sanity from "@sanity/astro";
// import react from "@astrojs/react";
const {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET
} = loadEnv(process.env.NODE_ENV, process.cwd(), "");


// https://astro.build/config
const hasSanityEnv = Boolean(PUBLIC_SANITY_PROJECT_ID) && Boolean(PUBLIC_SANITY_DATASET);

// Vercel serves from the domain root; GitHub Pages serves under /Personal_portfolio/.
// Detect Vercel builds so the base path (and asset URLs) are correct on each host.
const isVercel = Boolean(process.env.VERCEL);
const vercelUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export default defineConfig({
  site: isVercel
    ? vercelUrl
      ? `https://${vercelUrl}`
      : "https://nadirkhan-dev.github.io"
    : "https://nadirkhan-dev.github.io",
  base: isVercel ? "/" : "/Personal_portfolio/",
  integrations: [tailwind(),
    partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    }),
    ...(hasSanityEnv
      ? [
          sanity({
            projectId: PUBLIC_SANITY_PROJECT_ID,
            dataset: PUBLIC_SANITY_DATASET,
            useCdn: true,
          }),
        ]
      : [])]
});
