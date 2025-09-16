import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [svgr(), react()],
  resolve: { alias: { '@': '/src' } },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup',
    globals: true,
  },
  server: {
    proxy: {
      '/misc': {
        target: 'https://eccdn.com.au',
        changeOrigin: true,
        secure: false, 
      }
    }
  }

})
