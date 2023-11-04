import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "embed.js",
        assetFileNames: "embed.css",
        chunkFileNames: "chunk.js",
        manualChunks: undefined,
      },
    },
  },
});
