import theRealFetch from 'isomorphic-fetch';
import qs from 'qs';
import { message } from 'antd';
import nprogress from 'nprogress';
import cloneDeep from 'lodash/cloneDeep';

/** Utils
 -------------------------------------------------- */
const isNil = (value: string | null | undefined) => value === undefined || value === null || value === '';
const deleteDeep = (target: { [x: string]: any; }) =>
  Object.keys(target).forEach((key) => {
    if (typeof target[key] === 'object' && target[key] !== null) {
      deleteDeep(target[key]);
    } else if (isNil(target[key])) {
      delete target[key];
    }
  });
export const parseParams = (params: any) => {
  const paramsCopy = cloneDeep(params);
  deleteDeep(paramsCopy);
  return paramsCopy;
};

/**
 * 添加空数组参数 (qs 不会 stringify 空值参数)
 * 这里只处理了空数组
 * @param obj
 * @returns {string}
 */
const stringifyObject = (obj: any) => {
  const qsString = qs.stringify(obj);
  const emptyKeys = Object.entries(obj).reduce((acc, [key, value]: any) => {
    if (Array.isArray(value) && value.length === 0) {
      return acc.concat(key);
    }
    return acc;
  }, []);
  const formatString = emptyKeys.reduce((acc, str) => `${acc}&${str}[]=`, '');
  return formatString.length ? `${qsString}&${formatString}` : qsString;
};

/** Request
 -------------------------------------------------- */
const defaultOptions = {
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
};

/** Response
 -------------------------------------------------- */
// const redirect = (url) => {
//   const redirectUrl = url.replace(
//     /http%3A%2F%2Fabc.sftcwl.com%3A8222/g,
//     encodeURIComponent(window.location.origin),
//   );
//   return window.location.replace(redirectUrl);
// };

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url              The URL we want to request
 * @param  {string} [type]           The HTTP method for our request
 * @param  {object} [params]         The HTTP message body for our request
 * @param  {boolean} [notFormat]     Whether format params using `qs`
 * @param  {object} [otherOptions]   Other options except "method" & "body" for our request
 * @param  {string} [errMsg]         The message we want to show when request got error
 */
const fetch: any = (url: string, { type = 'GET', params, notFormat = false, errMsg, ...otherOptions }: any = {}) =>
  new Promise((resolve, reject) => {
    let newUrl = url;
    let newOptions = {
      ...defaultOptions, ...otherOptions, method: type, redirect: 'manual'
    };
    const token = localStorage.getItem('token') || '';
    if(token){
      params = params ? { ...params, token } : { token };
    }
    if (params) {
      if (type === 'GET') {
        newUrl = `${newUrl}?${qs.stringify(parseParams(params))}`;
      } else if (type === 'POST') {
        newOptions = {
          ...newOptions,
          body: notFormat ? params : stringifyObject(params),
        };
      }
    }
    nprogress.start();
    theRealFetch(newUrl, newOptions)
      .then(async (res) => {
        nprogress.done();
        const { status, statusText, url: requestUrl } = res;


        // 接口正常，返回 { errno, errmsg, data }
        if (status >= 200 && status < 300) {
          const data = await res.json();
          return data;
        }
        // console.log("走到这1",res);
        // ① 接口 500 等，返回错误
        const err = `${errMsg ? `${errMsg}|` : ''}接口${status}:${statusText}`;
        const instanceErr = new Error(err);
        (instanceErr as any).statusCode = status || '';
        return Promise.reject(instanceErr);
      })
      .then((resData) => {
        // console.log("走到这2",resData);
        const { res, data, errdata, code } = resData;
        // 1. 请求成功，errno 为 succ，直接返回 result
        if (res === 'succ') {
          return resolve(data);
        }
        // 0：token过期；-1缺少token；-2token无效；-10异常；-11不存在；-20账号未审核；-21账号审核失败；-22账号已删除
        if ([0,-1,-2,-10,-11,-20,-21,-22].includes(code)){
          if(window.location.pathname !== '/'){
              // token无效 未登录跳转到首页
              window.location.href='/';
          }
          return
        }
        // ② 请求接口成功，errno 不为 0，返回错误
        const err = `${errdata ? `${errdata} | ` : ''}${errdata}`;
        message.error(err);
        return reject(new Error(err));
      })
      .catch((err) => {
        console.log("走到这3",err);
        message.error(err.message);
        nprogress.done();
        reject(err);
      });
  });

export default fetch;
