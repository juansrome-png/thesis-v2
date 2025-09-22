import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // Make environment variables available to the client
    'import.meta.env.VITE_ALPHA_VANTAGE_KEY': JSON.stringify(process.env.ALPHA_VANTAGE_KEY),
    'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY),
    'import.meta.env.VITE_POLYGON_API_KEY': JSON.stringify(process.env.POLYGON_API_KEY),
  },
  server: {
    proxy: {
      '/api/polygon': {
        target: 'https://api.polygon.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/polygon/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Add API key to all requests
            const url = new URL(proxyReq.path, 'https://api.polygon.io');
            url.searchParams.set('apikey', 'GVq4outSlveTHtyUri_yFnoMTK9bKbHX');
            proxyReq.path = url.pathname + url.search;
            console.log('Proxying request to:', url.toString());
          });
        }
      }
    }
  }
});
