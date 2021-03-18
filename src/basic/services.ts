import fetch from '@/utils/fetch';

/**
 * 获取用户信息
 * @returns 
 */
export const serviceGetUserInfo = () => fetch('/index.php/WebApi/User/refresh');
