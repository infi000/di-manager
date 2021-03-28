import fetch from '@/utils/fetch';
import { ICreateParams, IModifyParams } from './type';

/**
 * 获取题目
 * @param params 
 * @returns 
 */
export const serviceGetTableList = (params: { sid: string }) => fetch('/index.php/AdminApi/Question/search', { params, type: 'POST' });

/**
 * 添加题目
 * @param params 
 * @returns 
 */
export const servicePostCreate = (params: ICreateParams) => fetch('/index.php/AdminApi/Question/add', { params, type: 'POST' });

/**
 * 修改题目
 * @param params 
 * @returns 
 */
export const servicePostModify = (params: IModifyParams) => fetch('/index.php/AdminApi/Question/modify', { params, type: 'POST' });
