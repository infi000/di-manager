import fetch from '@/utils/fetch';
import { ICreateParams, IModifyParams, ICreateParamsBatch } from './type';

/**
 * 列表
 * @param params 
 * @returns 
 */
export const serviceGetTableList = (params: { qid: string }) => fetch('/index.php/AdminApi/Judge/search', { params, type: 'POST' });

/**
 * 添加
 * @param params 
 * @returns 
 */
export const servicePostCreate = (params: ICreateParams) => fetch('/index.php/AdminApi/Judge/add', { params, type: 'POST' });

/**
 * 批量添加
 * @param params 
 * @returns 
 */
export const servicePostCreateBatch = (params: ICreateParamsBatch) => fetch('/index.php/AdminApi/Judge/batchadd', { params: { data: JSON.stringify(params) }, type: 'POST' });

/**
 * 修改
 * @param  
 * @returns 
 */
export const servicePostModify = (params: IModifyParams) => fetch('/index.php/AdminApi/Judge/modify', { params, type: 'POST' });

/**
 * 删除
 * @param 
 * @returns 
 */
export const servicePostDel = (params: { jid: string }) => fetch('/index.php/AdminApi/Judge/delete', { params, type: 'POST' });
