import { extend } from "umi-request";
import { message } from 'antd';

export const PREFIX = '/api';

// 把userid添加到请求头
export const AddAuthToken = (url, options = {}) => {
    // const ahthor = localStorage.getItem('authorzation');
    const header = {}
    header['X-User-Id'] = '666666';

    return {
        url,
        options: {
            ...options,
            // headers: {
            //     ...(options?.headers || {}),
            //     ...header
            // }
        }
    }
}

// 全局异常信息拦截
export const AddGlobalError = async (ctx, next) => {
    await next();
    if (ctx.res.success === false) {
        message.error(ctx.res.errorMsg);
    }
};

// 删除登陆信息
export const DelAuthToken = async (response) => {

    localStorage.removeItem('authorzation');

    return response;
}

// 配置request请求时的默认参数
const request = extend({
    errorHandle: (error) => {
        console.log('error==>', error)
    },
    // 默认请求带上cookie
    credentials: 'include',
    prefix: PREFIX,
});


request.use(AddGlobalError);

request.interceptors.request.use(AddAuthToken);
request.interceptors.response.use(DelAuthToken);

// url:请求路径;params 业务参数; options: 定制化请求参数;
export const get = (url, params = {}, options = {}) => {
    return request.get(url, { ...params, ...options });
};

// url:请求路径;data: body 参数,params query参数; options: 定制化请求参数;
export const post = (url, data = {}, params = {}, options = {}) => {
    return request.post(url, { ...options, data, params });
};


// url:请求路径;data: body 参数,params query参数; options: 定制化请求参数;
export const del = (url, data = {}, params = {}, options = {}) => {
    return request.delete(url, { ...options, data, params });
};
