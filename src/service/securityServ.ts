import Request from '@/utils/request';
import {AxiosRequestConfig} from "axios";


class SecurityServ {
    request: Request;
    tokenPrefix = "Bearer "
    authorizationKey = "Authorization"

    constructor() {
        this.request = new Request()
    }

    createAuthHeader(config?: AxiosRequestConfig) {
        const token = this.tokenPrefix + this.getToken()
        const authConfig = config ?? {}

        if (authConfig.headers) {
            authConfig.headers[this.authorizationKey] = token
        } else {
            authConfig.headers = {[this.authorizationKey]: token}
        }

        return authConfig
    }

    async authPost<D>(url: string, data?: D, config?: AxiosRequestConfig) {
        return await this.request.post<D>(url, data, this.createAuthHeader(config))
    }

    async authGet(url: string, config?: AxiosRequestConfig) {
        return await this.request.get(url, this.createAuthHeader(config))
    }

    async getToken() {
        return "123456"
    }
}

const securityServ = new SecurityServ()

export default securityServ
