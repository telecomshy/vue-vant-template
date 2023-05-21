import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

interface ApiError {
    code: number,
    message: string
}

const baseURL = import.meta.env.VITE_BASE_URL
const timeout = 3000

export default class Request {
    $axios: AxiosInstance

    constructor() {
        this.$axios = axios.create({
            baseURL,
            timeout,
            headers: {"content-type": "application/json"},
        })
    }

    normalizeError(error: any): ApiError {
        if (error.response) {
            const {status, statusText, data} = error.response

            let message

            if (status === 422) {
                message = "数据验证失败"
            } else if (status === 500) {
                message = "服务器内部错误"
            } else {
                message = data.detail ?? statusText
            }

            return {code: 2, message}

        } else if (error.request) {
            return {code: 1, message: "网络连接失败或服务器内部错误"}
        } else {
            return {code: 1, message: "请求构建失败"}
        }
    }

    async request(config: AxiosRequestConfig): Promise<[ApiError] | [undefined, any]> {
        try {
            const response = await this.$axios.request(config)
            return [undefined, response.data]
        } catch (error) {
            return [this.normalizeError(error)]
        }
    }

    async get(url: string, config?: AxiosRequestConfig) {
        return await this.request(Object.assign(config ?? {}, {url, method: 'get'}))
    }

    async post<D>(url: string, data?: D, config?: AxiosRequestConfig) {
        return await this.request(Object.assign(config ?? {}, {url, data, method: 'post'}))
    }
}

