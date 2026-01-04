import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Setup alias for easy imports (e.g., import Component from '@/components/Component')
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // A Netflix clone will likely have large initial bundles due to assets/libraries
    chunkSizeWarningLimit: 1000, 
    rollupOptions: {
      output: {
        // Simple manual chunking strategy for production optimization
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group major frameworks (React, Router)
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            // Group utility libraries (Axios, Framer Motion)
            if (id.includes('axios') || id.includes('framer-motion')) {
                return 'vendor-utils';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});