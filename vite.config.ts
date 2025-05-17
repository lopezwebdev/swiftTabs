import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs/promises';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-files',
      async writeBundle() {
        // Ensure extension/dist directory exists
        await fs.mkdir('extension/dist', { recursive: true });
        // Copy manifest.json to extension/dist
        await fs.copyFile(
          'extension/manifest.json',
          'extension/dist/manifest.json'
        );
        // Copy HTML files to extension/dist
        await fs.copyFile(
          'extension/popup.html',
          'extension/dist/popup.html'
        );
        await fs.copyFile(
          'extension/floating.html',
          'extension/dist/floating.html'
        );
        // Copy assets to extension/dist
        await fs.cp('extension/assets', 'extension/dist/assets', { recursive: true });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'extension/dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'extension/src/popup/index.tsx'),
        floating: path.resolve(__dirname, 'extension/src/floating/index.tsx'),
        background: path.resolve(__dirname, 'extension/src/background/background.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'icons': ['lucide-react'],
        },
      },
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './extension/src'),
    },
  },
});