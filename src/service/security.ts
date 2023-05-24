import {request} from '@/utils/request';
import {AxiosRequestConfig} from "axios";
import {RouteRecordRaw, useRouter} from "vue-router";
import {ServiceError} from "@/types/apitypes";


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


async function handleTokenExpired(error: ServiceError) {
    // 如果token过期则跳转到首页
    if (error.code === "ERR_006") {
        await router.push({name: 'login'})
    }
}

async function authPost<D>(url: string, data?: D, config?: RequestConfig) {
    try {
        return await request.post<D>(url, data, createAuthHeader(config))
    } catch (error) {
        await handleTokenExpired(error as ServiceError)
        return Promise.reject(error)
    }
}

async function authGet(url: string, config?: RequestConfig) {
    try {
        return await request.get(url, createAuthHeader(config))
    } catch (error) {
        await handleTokenExpired(error as ServiceError)
        return Promise.reject(error)
    }
}

function getToken() {
    return localStorage.getItem("token")
}

function setToken(token: string) {
    localStorage.setItem("token", token)
}

function removeToken() {
    localStorage.removeItem("token")
}

interface LoginData {
    username: string,
    password: string,
    uuid: string,
    captcha: string
}

async function login(loginData: LoginData) {
    try {
        const token = await request.post("/login", loginData)
        setToken(token)
    } catch (error) {
        return Promise.reject(error)
    }
}


async function logout() {
    removeToken()
    await router.push({name: "login"})
}

async function getCaptcha(uuid: string) {
    try {
        const blob = await request.get("/captcha", {
            params: {uuid},
            responseType: "blob"
        })
        return URL.createObjectURL(blob)
    } catch (error) {
        return Promise.reject(error)
    }
}

function isLogin() {
    return !!getToken();
}

export default function useSecurity() {
    return {login, logout, authGet, authPost, getCaptcha, isLogin}
}
