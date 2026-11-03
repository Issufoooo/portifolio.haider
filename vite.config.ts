import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Separa as bibliotecas pesadas para o browser as guardar em cache
        // e para o Three.js só ser descarregado quando o Hero o pedir.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/three/') || id.includes('@react-three')) return 'three';
          if (id.includes('/gsap/')) return 'gsap';
          if (id.includes('/motion') || id.includes('framer-motion')) return 'motion';
          if (id.includes('@radix-ui')) return 'radix';
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) return 'react';
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
