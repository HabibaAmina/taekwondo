import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mochaPlugins, type MochaEnv } from "@getmocha/vite-plugins";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [...mochaPlugins(process.env as MochaEnv), react()],
  server: {
    allowedHosts: true,
    port: 3002,
    cors: true,
    proxy: {
      '/video-files': {
        target: 'https://videos.pexels.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/video-files/, '')
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
});
