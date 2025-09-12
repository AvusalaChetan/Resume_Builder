import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
    server: {
    proxy: {
      '/api/auth/register': {
        target: 'https://resume-builder-g1zx.onrender.com',
        changeOrigin: true,
      },
      '/api/auth/register/verify-otp': {
        target: 'https://resume-builder-g1zx.onrender.com',
        changeOrigin: true,
      },
      '/api/auth/login':{
        target: 'https://resume-builder-g1zx.onrender.com',
        changeOrigin: true,
      },
      '/api/auth/logout':{
        target: 'https://resume-builder-g1zx.onrender.com',
        changeOrigin: true,
      },
      '/api/profile':{
        target: 'https://resume-builder-g1zx.onrender.com',
        changeOrigin: true,
      },
      '/api/resume':{
        target: 'https://resume-builder-g1zx.onrender.com',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://resume-builder-g1zx.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/token': {
        target: 'https://resume-builder-g1zx.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    }
  }
})
