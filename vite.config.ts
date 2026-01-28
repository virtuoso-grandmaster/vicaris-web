import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom"],
  },
  server: {
    // Enable SPA fallback for client-side routing
    // This allows direct navigation to any route
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-tooltip"],
          stripe: ["@stripe/react-stripe-js", "@stripe/stripe-js"],
        },
      },
    },
  },
});
