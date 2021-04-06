import { FormComponentProps } from 'antd/lib/form';
import { model } from './model';

/**
 * 列表成员
 */
export interface ITableItem {
  'id': string; //  "1299",
  'ucard': string; //  "",
  'uname': string; //  "185-33307 ",
  'phone': string; //  "15810820536",
  'school': string; //  "首都师范大学附属育新学校",
  'schoolename': string; //  "yuxin of CNU",
  'province': string; //  "北京",
  'head': string; //  "http: string; // //localhost/match",
  'email': string; //  "",
  'age': string; //  "0",
  'ctime': string; //  "2021-03-17 22: string; // 54: string; // 32",
  'status': string; //  "0"
}

/**
 * status审核状态-1删除，0未审核，1审核通过正常，4审核失败（不通过）
 */
export type TStatus = '-1' | '0' | '1' | '4';


export type TAction = ReturnType<typeof model.actions> & typeof model.reducers;

export type IState = typeof model.state;

export interface IProps extends IBasicState, TAction, IState, FormComponentProps { }
