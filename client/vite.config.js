import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      proxy: {
        '/api': {
          target: "https://expense-tracker-api-mu.vercel.app",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
  };
});
