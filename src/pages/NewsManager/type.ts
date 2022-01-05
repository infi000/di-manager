import { FormComponentProps } from 'antd/lib/form';
import { model } from './model';

/**
 * 列表成员
 */
export interface ITableItem {
  'id': string;
  'title': string;
  'describe': string;
  'aid': string;
  'ctime': string;
  'sort': string;
  'ntype': string;
  'status': string;

}

/**
 * status审核状态-1删除，0未审核，1审核通过正常，4审核失败（不通过）
 */
export type TStatus = '-1' | '0' | '1' | '4';


export type TAction = ReturnType<typeof model.actions> & typeof model.reducers;

export type IState = typeof model.state;

export interface IProps extends IBasicState, TAction, IState, FormComponentProps { }
