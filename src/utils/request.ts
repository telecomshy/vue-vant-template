import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const baseURL = import.meta.env.VITE_BASE_URL
const timeout = 3000

class Request {
    $axios: AxiosInstance

    constructor() {
        this.$axios = axios.create({
            baseURL,
            timeout,
            headers: {"content-type": "application/json"},
        })
    }

    async request(config: AxiosRequestConfig): Promise<[undefined, any] | [{ code: string, message: string }]> {
        try {
            const response = await this.$axios.request(config)

            const {success, code, message, data} = response.data

            if (success) {
                return [undefined, data]
            } else {
                return [{code, message}]
            }
        } catch (error) {
            return [{code: "ERR_999", message: "网络或服务器内部错误"}]
        }
    }

    async get(url: string, config?: AxiosRequestConfig) {
        return await this.request(Object.assign(config ?? {}, {url, method: 'get'}))
    }

    async post<D>(url: string, data?: D, config?: AxiosRequestConfig) {
        return await this.request(Object.assign(config ?? {}, {url, data, method: 'post'}))
    }
}

const request = new Request()

export {request, Request}