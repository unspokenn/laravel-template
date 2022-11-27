import {expand} from "dotenv-expand";
import {config} from "dotenv";
import {defineConfig} from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import manifestSRI from "vite-plugin-manifest-sri";
import mkcert from "vite-plugin-mkcert";
import {TailwindCSSVitePlugin} from 'tailwindcss-vite-plugin';
import checker from 'vite-plugin-checker';
import eslintPlugin from "@nabla/vite-plugin-eslint";
import {VitePlugin} from 'vite-esbuild-typescript-checker';
import webfontDownload from 'vite-plugin-webfont-dl';
import {VitePWA} from 'vite-plugin-pwa'

expand(config({path: '.env'}));

export default defineConfig({
    build: {
        outDir: '/public/build',
        emptyOutDir: true,
        manifest: true,
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
    },
    plugins: [
        mkcert(),
        eslintPlugin(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            }
        }),
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
        VitePlugin({
            vite: {
                overlay: true
            },
            checker: {
                typescript: {
                    extensions: {
                        vue: {
                            enabled: true,
                            compiler: '@vue/compiler-sfc'
                        }
                    }
                }
            }
        }),
        checker({
            vueTsc: true,
        }),
        TailwindCSSVitePlugin(),
        manifestSRI(),
        webfontDownload(),
    ],
    ssr: {
        noExternal: ["@inertiajs/server"],
    },
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    server: {
        origin: process.env.APP_URL,
        https: true,
    },
});
