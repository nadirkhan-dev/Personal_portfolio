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

// Deployed on Vercel, which serves from the domain root.
const vercelUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export default defineConfig({
  site: vercelUrl ? `https://${vercelUrl}` : "https://nadirkhan-dev.vercel.app",
  base: "/",
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
