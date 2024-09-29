import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
    plugins: [react()],
    define: {
        'global': {},
        'process.env': {},
        'Buffer': require('buffer').Buffer
    },
    resolve: {
        alias: {
            'buffer': 'buffer/' // Ensure buffer is correctly resolved
        }
    }
});
