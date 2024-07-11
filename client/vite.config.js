import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      proxy: {
        '/api': {
          target: "https://expensetracker-vbp3.onrender.com",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
  };
});