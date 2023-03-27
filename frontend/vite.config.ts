import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/service-email-tolerant/',
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 8080
  }
})
