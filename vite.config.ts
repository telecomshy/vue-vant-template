import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import Components from 'unplugin-vue-components/vite';
import {viteMockServe} from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteMockServe(),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src")
        },
    }
})
