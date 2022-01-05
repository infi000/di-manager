import fetch from '@/utils/fetch';
import { ITableItem, TStatus } from './type';

/**
 * 获取题目
 * @param params
 * @returns
 */
export const serviceGetTableList = (params: { aid?: string;} & TPageFetch): Promise<{news: ITableItem[]; total: number}> => fetch('/index.php/AdminApi/News/news', { params });

/**
 * 审核
 * @param params
 * @returns
 */
export const servicePostAudit = (params: {uid: string; status: TStatus}) => fetch('/index.php/AdminApi/User/verifyleader', { params, type: 'POST' });

/**
 * 批量添加裁判分配到比赛
 * @param param
 * @returns
 */
export const servicePostBatch = (params: {uids: string; sid: string}) => fetch('/index.php/AdminApi/UserWorks/batchautoadd', { params, type: 'POST' });


/**
 * 添加
 * @param params 
 * @returns 
 */
 export const servicePostCreate = (params: any) => fetch('/index.php/AdminApi/News/add', { params, type: 'POST' });

 /**
  * 修改
  * @param  
  * @returns 
  */
 export const servicePostModify = (params: any) => fetch('/index.php/AdminApi/News/modify', { params, type: 'POST' });
 

 /**
  * 删除
  * @param  
  * @returns 
  */
 export const servicePostDel = (params: any) => fetch('/index.php/AdminApi/News/delete', { params, type: 'POST' });
 