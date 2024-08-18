import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "Waves",
        name: "Waves",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#FFDB00",
        background_color: "#ffffff",
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/01.png",
            type: "image/png",
            sizes: "720x540",
            form_factor: "narrow",
          },
          {
            src: "/screenshots/02.png",
            type: "image/png",
            sizes: "540x720",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
});
