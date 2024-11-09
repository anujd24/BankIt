import { defineConfig } from 'vite';
import { Buffer } from 'buffer';

export default defineConfig({
  define: {
    // Ensuring that Buffer is correctly handled globally in Vite build
    'global.Buffer': JSON.stringify(Buffer),
  },
  build: {
    // Commonjs support for polyfills
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
});
