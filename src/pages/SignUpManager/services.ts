import fetch from '@/utils/fetch';
import { ISearch, IVerifypay, ISetcode, IInvoiceDetail } from './type';

/**
 * 获取
 * @param params 
 * @returns 
 */
export const serviceGetTableList = (params: ISearch) => fetch('/index.php/AdminApi/Team/teams', { params, type: 'POST' });


/**
 * 修改支付状态
 * @param params 
 * @returns 
 */
export const servicePostPayType = (params: IVerifypay) => fetch('/index.php/AdminApi/Team/verifypay', { params, type: 'POST' });


/**
 * 设置队伍挑战号
 * @param params 
 * @returns 
 */
export const servicePostSetCode = (params: ISetcode) => fetch('/index.php/AdminApi/Team/setcode', { params, type: 'POST' });


/**
 * 设置队伍挑战号
 * @param params 
 * @returns 
 */
export const serviceGetInvoiceDetail = (params: {tid: string}): Promise<IInvoiceDetail> => fetch('/index.php/AdminApi/Team/bill', { params });

/**
 * 获取比赛列表
 * @param params
 * @returns
 */
 export const serviceGetSdict = (params?: {sid?: string; aid: string}) => fetch('/index.php/AdminApi/Teamwork/sdict', { params, type: 'POST' });
