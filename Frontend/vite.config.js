import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeModulesPolyfillPlugin(),
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  },
  resolve: {
    alias: {
      // Optional: Alias any Node.js modules for browser compatibility
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    },
  },
  define: {
    // Define global variables for Buffer
    'global': 'globalThis',
    'process.env': {},
  }
});
