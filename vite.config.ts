import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.BASE_API_URL,
        },
        '/public': {
          target: env.BASE_API_URL,
        }
      }
    },
    css: {
      preprocessorOptions: {
        css: {
          // Enable CSS modules
          modules: true,
        },
      },
    },
  };
});
