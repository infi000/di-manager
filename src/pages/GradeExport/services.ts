import fetch from '@/utils/fetch';
import { ISearch } from './type';

/**
 * 获取
 * @param params
 * @returns
 */
export const serviceGetTableList = (params: ISearch) => fetch('/index.php/AdminApi/Teamwork/all', { params, type: 'POST' });

/**
 * 获取比赛列表
 * @param params
 * @returns
 */
export const serviceGetSdict = (params?: {sid?: string; aid?: string}) => fetch('/index.php/AdminApi/Teamwork/sdict', { params, type: 'POST' });

/**
 * 获取比赛下字典项Teamwork/dict
 * @param params
 * @returns
 */
export const serviceGetdict = (params: {sid: string}) => fetch('/index.php/AdminApi/Teamwork/dict', { params, type: 'POST' });


/**
 * 获取评审详细信息Teamwork/detail
 * @param params
 * @returns
 */
export const serviceGetDetail = (params: {tid: string}) => fetch('/index.php/AdminApi/Teamwork/detail', { params, type: 'POST' });


/**
 * 导出队伍Team/export
 * @param params
 * @returns
 */
export const servicePostExportTeam = (params: {sid: string;qid?: string;tid?: string}) => fetch('/index.php/AdminApi/Teamwork/detail', { params, type: 'POST' });

/**
 * 导出用户User/export
 * @param params
 * @returns
 */
export const servicePostExportUser = (params: {sid: string;qid?: string;tid?: string}) => fetch('/index.php/AdminApi/Teamwork/detail', { params, type: 'POST' });

/**
 * 导出作品分数（原始分）Works/oexport
 * @param params
 * @returns
 */
export const servicePostExportO = (params: {sid: string}) => window.open(`/index.php/AdminApi/Works/oexport?sid=${params.sid}`, '_blank');

/**
 * 导出比例分
 * @param params
 * @returns
 */
export const servicePostExportU = (params: {sid: string}) => window.open(`/index.php/AdminApi/Works/uexport?sid=${params.sid}`, '_blank');
/**
 * 获取作品
 * @param params
 * @returns
 */
export const serviceGetFile = (params: {wid: string}) => fetch('/index.php/AdminApi/Works/work', { params });
