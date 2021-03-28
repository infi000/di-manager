import fetch from '@/utils/fetch';
import { ICreateParams, IModifyParams, ICreateParamsBatch } from './type';

/**
 * 列表
 * @param params 
 * @returns 
 */
export const serviceGetTableList = (params: { qid: string }) => fetch('/index.php/AdminApi/Question/needfiles', { params, type: 'POST' });

/**
 * 添加
 * @param params 
 * @returns 
 */
export const servicePostCreate = (params: ICreateParams) => fetch('/index.php/AdminApi/Question/addneedfile', { params, type: 'POST' });

/**
 * 批量添加
 * @param params 
 * @returns 
 */
 export const servicePostCreateBatch = (params: ICreateParamsBatch) => fetch('/index.php/AdminApi/Question/batchaddneedfile', { params, type: 'POST' });

/**
 * 修改
 * @param  
 * @returns 
 */
export const servicePostModify = (params: IModifyParams) => fetch('/index.php/AdminApi/Question/modifyneedfile', { params, type: 'POST' });

/**
 * 删除
 * @param 
 * @returns 
 */
export const servicePostDel = (params: {qid: string}) => fetch('/index.php/AdminApi/Question/deleteneedfile', { params, type: 'POST' });
