import fetch from '@/utils/fetch';
import { ITableItem, IRefferItem } from './type';

/**
 * 获取题目
 * @param params
 * @returns
 */
export const serviceGetTableList = (params: { sid: string } & TPageFetch): Promise<{quesjts: ITableItem[]; total: number}> => fetch('/index.php/AdminApi/Judge/jtall', { params });

/**
 * 设置题目及裁判类型下裁判
 * @param param
 * @returns
 */
export const servicePostSetJudge = (params: {qid: string; uids: string; jtid: string}) => fetch('/index.php/AdminApi/Judge/setjudge', { params, type: 'POST' });
/**
 * 获取裁判
 * @param params
 * @returns
 */
 export const serviceGetRefferList = (params: { sid?: string } & TPageFetch): Promise<{users: IRefferItem[]; total: number}> => fetch('/index.php/AdminApi/User/search', { params });


/**
 * 获取比赛列表
 * @param params
 * @returns
 */
 export const serviceGetSdict = (params?: {sid?: string; aid?: string}) => fetch('/index.php/AdminApi/Teamwork/sdict', { params, type: 'POST' });
