import axios, { AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import Storage from '@utils/localStorage';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

import Error from '@utils/error';

const { $error } = Error;

// Basic axios instances
const $axios = axios.create({
  method: 'POST',
  timeout: 2500,
  headers: {
    'Content-Type': 'application/json',
    'lang': 'en',
    timezone: dayjs.tz.guess()
  }
});


// Request Interceptor
$axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // The backend service consists of multiple microservices, and different businesses correspond to different microservices.
  // Each microservice has a different prefix identifier
  // Distribute the Axios BaseUrl to the correct microservice based on the backend Api path.
  const { url, headers, data, params } = config;
  (config as any).headers.timestamp = new Date().getTime();

  let _baseUrl = '';
  // if (url?.indexOf('/constructor/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  //   // _baseUrl = VUE_APP_PROTOCOL + '10.8.0.103:23100' + VUE_APP_API_VERSION;
  // } else if (url?.indexOf('/assistant/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  //   // _baseUrl = VUE_APP_PROTOCOL + '192.168.3.79:23700' + VUE_APP_API_VERSION;
  // } else if (url?.indexOf('/element/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  //   // _baseUrl = VUE_APP_PROTOCOL + '10.8.0.101:23300' + VUE_APP_API_VERSION;
  // } else if (url?.indexOf('/scheduler/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  //   // _baseUrl = 'http://10.8.0.8:23200/v0';
  //   // _baseUrl = VUE_APP_PROTOCOL + VUE_APP_SIMULATION_API + VUE_APP_API_VERSION;
  // } else if (url?.indexOf('/account/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  // } else if (url?.indexOf('/disk/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  //   // _baseUrl = 'http://192.168.3.82:23600/v0';
  // } else if (url?.indexOf('/sse/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  // } else if (url?.indexOf('/mimis/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  // } else if (url?.indexOf('/record/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  // } else if (url?.indexOf('/message/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  //   // _baseUrl = 'http://10.8.0.20:23500/v0';
  // } else if (url?.indexOf('/assistantcpp/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  //   // _baseUrl = 'http://10.8.0.101:24003/v0';
  // } else if (url?.indexOf('/config/') === 0) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  // } else if (url?.indexOf('/request/') !== -1) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  //   // _baseUrl = 'http://192.168.0.104:23800/v0/request/submitTaskGroup';
  // } else if (url?.indexOf('/stuff/') !== -1) {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  // } else {
  //   _baseUrl = VUE_APP_PROTOCOL + GATEWAY + VUE_APP_API_VERSION;
  //   return Promise.reject(`[Configruation Error]: '${url}' does't contain the identifier of the backend microservices, but it's required here.`);
  // }
  // axios.defaults.baseURL = _baseUrl;
  // config.baseURL = _baseUrl;

  // Determine whether a token exists in vuex before each request is sent
  // If it exists, add the token to the header of the http request so that the backend can judge the login situation according to the token
  // Even if there is a token locally, it is possible that the token is expired, so the return status should be judged in the response interceptor

  // const token = Storage.get('authorization');
  // token && ((config as any).headers.Authorization = token);

  // if (headers && headers.needUserId) {
  //   const userId = Storage.get('userId');
  //   if (data) {
  //     data.userId = userId;
  //   }

  //   if (params) {
  //     params.userId = userId;
  //   }

  //   Reflect.deleteProperty(headers, 'needUserId');
  // }

  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.request = $axios.interceptors.request;


// Response Interceptor
$axios.interceptors.response.use((res: AxiosResponse) => {
  if (res.status === 200) {
    if (res.config.headers?.useAllResponse) {
      return Promise.resolve(res);
    }

    if (res.data.code !== 'SUCCESS') {
      $error({
        type: 'axios',
        error: res.data.message
      });
      Promise.reject(res.data);
    }

    return Promise.resolve(res.data);
  }

  // $error({
  //   type: 'axios',
  //   error: res.data
  // });
  return Promise.reject(res.data);

}, (error) => {
  if (error.response.status) {
    switch (error.response.status) {
      case 400:
        // $error({
        //   type: 'axios',
        //   error: error.response
        // });
        break;
      // 401: Not login
      // Redirect to the login page and carry the path of the current page
      // Return to the current page after successful login, this step needs to be operated on the login page.
      case 401:
        // router.replace({
        //     path: '/login',
        //     query: {
        //         redirect: router.currentRoute.Path
        //     }
        // });
        break;
        // 403: Token expired
        // Prompt the user when the login expires
        // Clear the local token and clear the token object in vuex
        // Redirect to login page
      case 403:
        // Toast({
        //   message: 'Login expired, please login again',
        //   duration: 1000,
        //   forbidClick: true
        // });

        // Clear token
        // localStorage.removeItem('token');
        // store.commit('loginSuccess', null);

        // Redirect to the login page, and carry the url of the current page.
        // setTimeout(() => {
        //   router.replace({
        //     path: '/login',
        //     query: {
        //         redirect:router.currentRoute.Path
        //     }
        //   });
        // }, 1000);
        break;
        // 404: Server url not found
      case 404:
        // Toast({
        //   message: 'Server url not found',
        //   duration: 1500,
        //   forbidClick: true
        // });
        // break;

        // 500: Server Error
        // Get backend assistance
      case 500:
        // Toast({
        //   message: '',
        //   duration: 1500,
        // });
        break;
      default:
        Promise.reject(error.response);
    }

    // $error({
    //   type: 'axios',
    //   error: error.response
    // });
    return Promise.reject(error.response);
  }
});

axios.interceptors.response = $axios.interceptors.response;

export default $axios;