import fetch from '@/utils/fetch';
import { IPostParams } from './types';
/**
 * 用户登陆
 */
export const servicePostLogin = (params: IPostParams) => fetch('/index.php/AdminApi/Manager/login', { params, type: 'POST' });
