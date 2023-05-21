/// <reference types="vite/client" />
// 配置说明：https://cn.vitejs.dev/guide/env-and-mode.html

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

