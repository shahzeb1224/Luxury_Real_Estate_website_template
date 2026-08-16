import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 3000,
    open: true,
  },

  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['clsx', 'tailwind-merge'],
          icons: ['react-icons'],
        },

        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop();

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }

          return `assets/${extType}/[name]-[hash][extname]`;
        },

        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
