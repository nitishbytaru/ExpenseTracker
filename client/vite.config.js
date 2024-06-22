import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/home": "http://localhost:3000",
      "/home": "https://Expense_Tracker.onrender.com",
    },
  },
  plugins: [react()],
});
