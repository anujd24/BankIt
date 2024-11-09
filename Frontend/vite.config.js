import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  define: {
    // Polyfill for Buffer
    Buffer: 'require("buffer").Buffer',
  },
  resolve: {
    alias: {
      // Optional: Ensure the buffer module is correctly resolved
      buffer: resolve(__dirname, 'node_modules', 'buffer')
    }
  }
});
