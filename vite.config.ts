import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/public': {
        target: 'http://localhost:3000',
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
})
