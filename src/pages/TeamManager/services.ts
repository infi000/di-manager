import fetch from '@/utils/fetch';
import { IPostParams, IPostTeamMember, IOrderParams } from './type';

/**
 * 创建队伍
 * @param params 
 * @returns 
 */
export const servicePostCreate = (params: IPostParams) => fetch('/index.php/WebApi/Team/create', { params, type: 'POST' });

/**
 * 获取队伍
 * @returns 
 */
export const serviceGetTeam = () => fetch('/index.php/WebApi/Team/myteams');

/**
 * 添加队员
 * @returns 
 */
export const servicePostTeamMember = (params: IPostTeamMember) => fetch('/index.php/WebApi/Team/add', { params, type: 'POST' });

/**
 * 获取题目
 * @returns 
 */
export const serviceGetQuestion = (params?: { sid?: string }) => fetch('/index.php/WebApi/User/questions', { params });

/**
 * 获取题目
 * @returns 
 */
export const servicePostCreateOrder = (params:IOrderParams) => fetch('/index.php/WebApi/Team/createorder', { params, type: 'POST' });
