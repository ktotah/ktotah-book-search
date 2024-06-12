import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Keeping your front-end port as 3001
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3002', // Backend port as 3002
        secure: false,
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist' // Ensure build output directory is set
  }
})
