import fetch from '@/utils/fetch';
import { IPostParams } from './type';

export const servicePostRegister = (params: IPostParams) => fetch('/index.php/WebApi/User/register', { params, type: 'POST' });
