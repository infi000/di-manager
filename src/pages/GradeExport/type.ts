import { FormComponentProps } from 'antd/lib/form';
import { model } from './model';


/**
 * 查询项
 */
export interface ISearch {
  sid?: string; // 比赛id
  age?: string; // 年龄组别
  qid?: string; // 题目id（tc题目）
}

/**
 * 列表项
 */
export interface ITableItem {
  'tid': string; //  "735",
  'tname': string; //  "测试队伍4",
  'tcode': string; //  "123456",
  'wid': string; //  "15",
  'rankscore': string; //  "20.00",
  'q': any;
  'oscore': string; //  33.33
}


/**
 * 比赛id类型成员
 */
export type TSdict = {
  id: string; // 比赛id
  title: string;
}

/**
 * tc题目成员
 */
export type TDictQ = {
  qid: string; // 题目id
  title: string;
}

/**
 * 组别成员
 */
export type TDictA = {
  age: string;
}

/**
 * 详情成员项的子成员项
 */
export type TWjudeItem = {
  'id': string; //  "25",
  'wid': string; //  "5",
  'wcid': string; //  "3",
  'jtid': string; //  "24",
  'jtype': string; //  "B",
  'jid': string; //  "48",
  'describe': string; //  "关于侦探和搭档联手解开谜团的故事的创意",
  'score': string; //  "20",
  'pid': string; //  "14",
  'title': string; //  "A. 表演视频"
}
/**
 * 详情成员项
 */
export type TWorkJudgeItem = {
  'id': string; //  "3",
  'wid': string; //  "5",
  'uid': string; //  "272",
  'uname': string; //  "272",
  'comment': string; //  "\t线索的创意᧿绘\t线索的创意᧿绘",
  'videopath': string; //  "http: string; // //s1.gete-di.com",
  'ctime': string; //  "2021-04-07 00: string; // 28: string; // 21",
  'wjudges': TWjudeItem[];
}


export type TAction = ReturnType<typeof model.actions> & typeof model.reducers;

export type IState = typeof model.state;

export interface IProps extends IBasicState, TAction, IState, FormComponentProps { }
