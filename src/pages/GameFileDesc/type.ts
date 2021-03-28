import { model } from './model';
import { FormComponentProps } from 'antd/lib/form';

export enum EFtype {
  'mp4' = '1', 
  'pdf' = '2', 
  'jpg' = '3', 
}; 

/**
 * 添加文件描述 单独添加
 */
export interface ICreateParams {
  qid:string;// 题目id
  title:string;// 标题
  ftype: EFtype.pdf | EFtype.mp4 | EFtype.jpg;// 文件类型，1mp4,2pdf,3jpg
  describe?:string;// 描述
  sort?:string;// 排序值
}
/**
 * 添加描述 批量
 */
export interface ICreateParamsBatch {
  qid: string;
  nfs:Array<Omit<ICreateParams,'qid'>>
}

/**
 * 修改文件描述
 */
export interface IModifyParams extends Partial<ICreateParams> {
  qfid: string; // 需要文件描述id
}



/**
 * 文件描述列表
 */
export interface ITableItem extends Partial<ICreateParams> {
  id?: string;
}


export type TAction = ReturnType<typeof model.actions> & typeof model.reducers;

export type IState = typeof model.state;

export interface IProps extends IBasicState, TAction, IState, FormComponentProps { };
