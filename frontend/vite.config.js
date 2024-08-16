import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,  // Add this line
        secure: false,  // Only if you're experiencing issues with HTTPS
      },
    },
  },
  plugins: [react()],
});
