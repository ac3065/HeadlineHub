import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/live-news-website/',
  server: {
    proxy: {
      '/api': {
        target: 'https://newsapi.org/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Add API key to all requests
            const url = new URL(proxyReq.path, 'https://newsapi.org/v2');
            url.searchParams.set('apiKey', process.env.VITE_NEWS_API_KEY || 'bcc1d8445e254e9cb1bce4a9c68f62ef');
            proxyReq.path = url.pathname + url.search;
          });
        }
      }
    }
  },
  define: {
    'process.env': {}
  }
})