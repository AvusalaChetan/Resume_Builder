import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
    server: {
    proxy: {
      '/api/auth/register': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api/auth/register/verify-otp': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },

    }
  }
})
