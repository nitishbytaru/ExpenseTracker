import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/home": "http://localhost:3000",
      "/home": "https://expense-tracker-sandy-rho.vercel.app/",
    },
  },
  plugins: [react()],
});
