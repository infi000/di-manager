import { model } from './model';
import { FormComponentProps } from 'antd/lib/form';

export enum EFtype {
  'mp4' = '1',
  'pdf' = '2',
  'jpg' = '3',
};

/**
 * 添加
 */
export interface ICreateParams {
  qid: string;// 题目id
  data: {
    "jtype": "C", // 裁判类型
    "sort"?: string,
    "jts": {
      "id": string, // 评分标准id
      "chs": string[] // 评分标准内容id
    }[]
  }
}
/**
 * 添加 请求借口时用
 */
export type TTcreateParamsFetch = Omit<ICreateParams, 'data'> & { data: { jtype: string; jts: string; sort?: string } }


/**
 * 修改文件描述
 */
export interface IModifyParams extends Partial<ICreateParams> {
  id: string; //  	题目裁判类型（裁判类型）id
}



/**
 * 文件描述列表
 */
export interface ITableItem {
  'id': string;
  "qid": string;// 题目id
  "jts": {
    "id": string,
    "title": string;//  "评分标准内容新2",
    "child": {
      describe: string; // "详细评分标准2"
      id: string; //  "2"
      maxscore: string; // "50"
      sort: string; //  "2"
    }
  }[],
  judgedata:string;
  "sort": string;
  "jtype": string; //类型描述，如A、B、C、D等
}


export type TAction = ReturnType<typeof model.actions> & typeof model.reducers;

export type IState = typeof model.state;

export interface IProps extends IBasicState, TAction, IState, FormComponentProps { };
