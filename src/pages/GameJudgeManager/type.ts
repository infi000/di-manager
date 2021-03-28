import { model } from './model';
import { FormComponentProps } from 'antd/lib/form';

/**
 * 添加
 */
export interface ICreateParams {
  qid: string;// 题目id
  pid: string; // 评分标准描述id 
  describe: string; // 评分标准内容
  maxscore: string; // 评分最大分值
  sort?: string;
}


/**
 * 添加描述 批量
 */
export interface ICreateParamsBatch {
  qid: string;// 题目id
  p: Array<{
    title: string; //父描述
    sort?: string;
    ch: Array<{
      describe: string; // 评分标准内容
      maxscore: string; // 评分最大分值
      sort?: string;
    }>
  }>
}

/**
 * 修改
 */
export interface IModifyParams extends Partial<ICreateParams> {
  jid: string;// 评分标准id
}



/**
 * 列表
 */
export interface ITableItem {
  id: string;
  qid: string;// 题目id
  title: string; //父描述
  sort?: string;
  child: Array<{
    id: string;
    qid: string;// 题目id
    jtid: string; //父id
    describe: string; // 评分标准内容
    maxscore: string; // 评分最大分值
    sort?: string;
  }>
}


export type TAction = ReturnType<typeof model.actions> & typeof model.reducers;

export type IState = typeof model.state;

export interface IProps extends IBasicState, TAction, IState, FormComponentProps { };
