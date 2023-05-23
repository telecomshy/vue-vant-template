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

    async request(config: AxiosRequestConfig) {
        try {
            const response = await this.$axios.request(config)

            const {success, code, message, data} = response.data

            if (success) {
                return Promise.resolve(data)
            } else {
                return Promise.reject({code, message})
            }
        } catch (error) {
            // TODO 弹窗显示系统错误
        }
    }

    async get(url: string, config?: AxiosRequestConfig) {
        try {
            return await this.request(Object.assign(config ?? {}, {url, method: 'get'}))
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async post<D>(url: string, data?: D, config?: AxiosRequestConfig) {
        try {
            return await this.request(Object.assign(config ?? {}, {url, data, method: 'post'}))
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

const request = new Request()

export {request, Request}
