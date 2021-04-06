import fetch from '@/utils/fetch';
import { ITableItem } from './type';

/**
 * 获取裁判
 * @param params
 * @returns
 */
export const serviceGetTableList = (params: { sid: string } & TPageFetch): Promise<{users: ITableItem[]; total: number}> => fetch('/index.php/AdminApi/User/search', { params });

/**
 * 审核
 * @param params
 * @returns
 */
export const servicePostAudit = (params: {uid: string; status: '1' | '4'}) => fetch('/index.php/AdminApi/User/verifyjudge', { params, type: 'POST' });

/**
 * 批量添加裁判分配到比赛
 * @param param
 * @returns
 */
export const servicePostBatch = (params: {uids: string; sid: string}) => fetch('/index.php/AdminApi/UserWorks/batchautoadd', { params, type: 'POST' });
