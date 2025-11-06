import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['monaco-editor'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  server: {
    // dev server (local) settings — fine to keep
    fs: { allow: ['../..'] },
    host: true,
  },
  define: {
    global: 'globalThis',
  },
  // Vite will expose only variables that start with this prefix
  envPrefix: 'VITE_',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          monaco: ['monaco-editor'],
        },
      },
    },
  },
  // 👇 IMPORTANT: allow Railway preview host & bind to Railway's port
  preview: {
    host: true,
    // Railway provides PORT; fallback for local preview
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
    // Allow your specific Railway domain and any *.up.railway.app domains
    // Leading dot means “any subdomain”
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.up.railway.app',
      '.railway.app',
      'bubblelab-frontend-production.up.railway.app',
    ],
  },
});
