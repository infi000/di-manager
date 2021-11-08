import { model } from './model';
import { FormComponentProps } from 'antd/lib/form';

/**
 * 添加比赛参数
 */
export interface ICreateParams {
  title: string;//比赛标题
  describe: string;//比赛描述
  address: string;//比赛地点
  starttime: string;//比赛开始时间(yyyy-MM-dd)
  endtime: string;//比赛结束时间(yyyy-MM-dd)
  regstarttime?: string;// 注册开始时间(yyyy-MM-dd)
  regendtime: string;//注册结束时间(yyyy-MM-dd)
  commitstarttime?: string;// 提交方案开始时间(yyyy-MM-dd)
  commitendtime: string;//提交方案结束时间(yyyy-MM-dd)
  evaluationstarttime?: string;// 评比开始时间(yyyy-MM-dd)
  evaluationendtime: string;//评比结束时间(yyyy-MM-dd)
  resulttime: string;//成绩公布时间(yyyy-MM-dd)
  money: string;//报名费用，单位元，两位小数
  aid: string;//地区id
  thumbinal: string;//海报地址
  model?: string;// 比赛公告模板（样式）
}

/**
 * 修改比赛参数
 */
export interface IModifyParams extends Partial<ICreateParams> {
  sid: string; // 比赛id
}

/**
 * 比赛列表
 */
export interface ITableItem extends Partial<ICreateParams> {
  ctime?: string;
  status?: '1' | '0';
  id: string;
}

export type TAction = ReturnType<typeof model.actions> & typeof model.reducers;

export type IState = typeof model.state;

export interface IProps extends IBasicState, TAction, IState, FormComponentProps { };
