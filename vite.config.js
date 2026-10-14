import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Route-level code splitting is done in src/App.jsx with React.lazy.
// This config only adds the React plugin, the modern SCSS API, and
// vendor chunk separation so lazy route chunks stay small.
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('animejs')) return 'vendor-motion';
          if (/node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
            return 'vendor-react';
          }
          return undefined;
        },
      },
    },
  },
});
