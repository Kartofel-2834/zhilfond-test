// Node
import { fileURLToPath, URL } from 'node:url';

// Config
import { defineConfig } from 'vite';

// Plugins
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

const isProd: boolean = process?.env?.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader({
            defaultImport: 'raw',
        }),
    ],

    base: isProd ? '/zhilfond-test/' : '/',

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/scss/bundle";',
            },
        },
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
