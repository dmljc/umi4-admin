import { message } from 'antd';
import { history } from 'umi';
import { extend } from 'umi-request';

export const PREFIX = '/api';

// 把userid添加到请求头
export const AddAuthToken = (url, options = {}) => {
  const header = {};
  const authorization = localStorage.getItem('authorization');
  header['X-Authorization'] = authorization;

  if (!authorization) {
    history.push('/login');
    return;
  }

  return {
    url,
    options: {
      ...options,
      headers: {
        ...(options?.headers || {}),
        ...header,
      },
    },
  };
};

// 全局异常信息拦截
export const AddGlobalError = async (ctx, next) => {
  await next();
  if (ctx.res.success === false && ctx.res.errMsg) {
    message.error(ctx.res.errMsg);
  }
};

// 删除登陆信息
export const DelAuthToken = async (response) => {
  const data = await response.clone().json();

  if (data.code === 401) {
    history.push('/login');
    return;
  }

  return response;
};

// 配置request请求时的默认参数
const request = extend({
  errorHandle: (error) => {
    console.log('error==>', error);
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
