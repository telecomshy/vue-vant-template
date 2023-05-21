import {MockMethod} from 'vite-plugin-mock';

export default [
    {
        url: '/mock/api/v1/login',
        method: 'get',
        response: (config) => {
            console.log(config.headers)
            return {username: "telecomshy"};
        },
    },
] as MockMethod[];
