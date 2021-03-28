import { model } from './model';
import { FormComponentProps } from 'antd/lib/form';

/**
 * 添加题目
 */
export interface ICreateParams {
  title: string;// 题目
  alias: string;// 题目别名
  usermincount: number; // 报名最小人数
  usermaxcount: number; // 报名最大人数
  content: string;// 简述
  guide: string;// 旅程指南文件域
  challenge: string;// 挑战题文件域
  trainbook: string;// 即时挑战训练册文件域
  sid: string;// 所属赛程id
  sort?: string; // 排序值
  age?: TAgeType; //
  qtype?: '1' | '2';// 1:TC 2:IC
}

/**
 * 修改题目
 */
export interface IModifyParams extends Partial<ICreateParams> {
  qid: string; // 题目id
}

/**
 * 题目列表
 */
export interface ITableItem extends Partial<ICreateParams> {
  id: string;
}


export type TAction = ReturnType<typeof model.actions> & typeof model.reducers;

export type IState = typeof model.state;

export interface IProps extends IBasicState, TAction, IState, FormComponentProps { };
