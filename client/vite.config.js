import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://expensetrackerserver-ahy0.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
