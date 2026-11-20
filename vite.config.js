import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config — optimized for Netlify static hosting
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
  build: {
    target: 'es2018',
    cssMinify: true,
    // Emit small, cache-friendly hashed asset files
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          confetti: ['canvas-confetti'],
        },
      },
    },
  },
})
