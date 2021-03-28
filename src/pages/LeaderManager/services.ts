import fetch from '@/utils/fetch';
import { ITableItem, TStatus } from './type';

/**
 * 获取题目
 * @param params
 * @returns
 */
export const serviceGetTableList = (params: { status: TStatus } & TPageFetch): Promise<{leaders: ITableItem[]; total: number}> => fetch('/index.php/AdminApi/User/leaders', { params });

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
