import {request} from '@/utils/request';
import {AxiosRequestConfig} from "axios";
import {RouteRecordRaw, useRouter} from "vue-router";


const tokenPrefix = "bearer "
const authorizationKey = "Authorization"
const router = useRouter()

interface RequestConfig extends AxiosRequestConfig {
    redirect?: boolean
    redirectRoute?: RouteRecordRaw  // 如果出现token过期错误，跳转页面
}

function createAuthHeader(config?: RequestConfig) {

    const token = tokenPrefix + getToken()
    const authConfig = config ?? {}

    if (authConfig.headers) {
        authConfig.headers[authorizationKey] = token
    } else {
        authConfig.headers = {[authorizationKey]: token}
    }

    return authConfig
}


async function handleTokenExpired(target: Function) {
    return async function (...args: any[]) {

        const [error, data] = await target(...args)
        // 如果token过期则跳转到首页
        if (error.code === "ERR_006") {
            await router.push({name: 'login'})
        }
        return [error, data]
    }
}

async function authPost<D>(url: string, data?: D, config?: RequestConfig) {
    return await request.post<D>(url, data, createAuthHeader(config))
}

const authPostAPI = handleTokenExpired(authPost)

async function authGet(url: string, config?: RequestConfig) {
    return await request.get(url, createAuthHeader(config))
}

function getToken() {
    return localStorage.getItem("token")
}

function setToken(token: string) {
    localStorage.setItem("token", token)
}

async function login({username, password, uuid, captcha}) {

}


async function logout() {

}

function getCaptcha() {

}


export default function useSecurity() {
    return {login, logout, authGet, authPostAPI}
}
