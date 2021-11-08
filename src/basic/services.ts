import fetch from '@/utils/fetch';

/**
 * 获取用户信息
 * @returns 
 */
export const serviceGetUserInfo = () => fetch('/index.php/AdminApi/User/refresh');

/**
 * 获取地区
 * @returns 
 */
export const serviceGetAreas = () => fetch('/index.php/AdminApi/Area/areas');
