import fetch from '@/utils/fetch';
import { ICreateParams, IModifyParams } from './type';

/**
 * 添加比赛
 * @param params 
 * @returns 
 */
export const servicePostCreate = (params: ICreateParams) => fetch('/index.php/AdminApi/Schedule/add', { params, type: 'POST' });

/**
 * 修改比赛
 * @param params 
 * @returns 
 */
export const servicePostModify = (params: IModifyParams) => fetch('/index.php/AdminApi/Schedule/modify', { params, type: 'POST' });

/**
 * 获取比赛
 * @param params 
 * @returns 
 */
export const serviceGetTableList = (params: {}) => fetch('/index.php/AdminApi/Schedule/schedules', { params });

/**
 * 开启比赛
 * @param params 
 * @returns 
 */
export const serviceOpen = (params: { sid: string }) => fetch('/index.php/AdminApi/Schedule/open', { params, type: 'POST' });

/**
 * 关闭比赛
 * @param params 
 * @returns 
 */
export const serviceClose = (params: { sid: string }) => fetch('/index.php/AdminApi/Schedule/close', { params, type: 'POST' });
