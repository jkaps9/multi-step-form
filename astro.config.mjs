// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      cssVariable: "--font-ubuntu",
      fallbacks: ["sans-serif"],
      name: "Ubuntu",
      provider: fontProviders.google(),
      styles: ["normal"],
      weights: ["400 500 700"],
    },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "/src/styles/_variables.scss" as *;`,
        },
      },
    },
  },
});
