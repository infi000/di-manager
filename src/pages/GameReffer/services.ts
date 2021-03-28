import fetch from '@/utils/fetch';
import { ICreateParams, IModifyParams } from './type';

/**
 * 列表
 * @param params 
 * @returns 
 */
export const serviceGetTableList = (params: { qid: string }) => fetch('/index.php/AdminApi/Judge/jtsearch', { params, type: 'POST' });

/**
 * 添加
 * @param params 
 * @returns 
 */
export const servicePostCreate = (params: ICreateParams) => fetch('/index.php/AdminApi/Judge/jtadd', { params: { qid: params.qid, data: JSON.stringify(params.data) }, type: 'POST' });

/**
 * 修改
 * @param  
 * @returns 
 */
export const servicePostModify = (params: IModifyParams) => fetch('/index.php/AdminApi/Judge/jtmodify', { params:{ id: params.id, data: JSON.stringify(params.data) }, type: 'POST' });
