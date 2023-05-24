import {createRouter, createWebHistory} from "vue-router"
import useSecurity from "@/service/security"

const {isLogin} = useSecurity()

const routes = [
    {
        name: "login",
        path: "/login",
        component: () => import("@/views/LoginView.vue"),
        meta: {
            loginRequired: false
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to) => {
    if (to.meta.loginRequired && !isLogin()) {
        return {name: "login"}
    }
})

export {router}