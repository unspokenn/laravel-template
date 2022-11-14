const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(require('dotenv').config({ path: '.env' }));

import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import manifestSRI from "vite-plugin-manifest-sri";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
    build: {
        outDir: '/public/build',
        emptyOutDir: true,
        manifest: true,
    },
    plugins: [
        mkcert(),
        laravel({
            buildDirectory: "build",
            input: "resources/js/app.js",
            ssr: "resources/js/ssr.js",
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        manifestSRI(),
    ],
    ssr: {
        noExternal: ["@inertiajs/server"],
    },
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ["vue"],
        output: {
            // Provide global variables to use in the UMD build
            // for externalized deps
            globals: {
                vue: "Vue",
            },
        },
    },
    server: {
        origin: process.env.APP_URL,
        https: true,
    },
});
