import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://expense-tracker-api-mu.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
