import { FormComponentProps } from 'antd/lib/form';
import { model } from './model';

/**
 * 裁判
 */
export type TJudges = {
  'id': string; // "232",
  'wid': string; // "7",
  'uid': string; // "4",
  'jtid': string; // "1",
  'uname': string; // "judge1",
  'realname': string; // "测试裁判1",
  'school': string; // "北京大学",
  'province': string; // "北京市"

}

/**
 * 标准
 */
export type TJtItem = {
  'id': string; // "1",
  'sort': string; // "1",
  'jtype': string; // "A",
  'judges': TJudges[];
  qid?: string;
}
/**
 * 列表成员
 */
export interface ITableItem {
  'id': string; //  "1",
  'title': string; //  "挑战A 技术类 下一关",
  'alias': string; //  "Test1",
  'sort': string; //  "1",
  jts: TJtItem[];
}

/**
 * 裁判成员
 */
export interface IRefferItem {
  'id': string; // "4",
  'ucard': string; // "1101010101010",
  'uname': string; // "judge1",
  'jtid': string; // "1",
  'phone': string; // "18800000000",
  'school': string; // "北京大学",
  'schoolename': string; // "beijingdaxue",
  'province': string; // "北京市",
  'head': string; // "http://localhost/match/Uploads/User/2021-03-13/604b905e923af.jpg",
  'email': string; // "qooo@126.com",
  'age': string; // "45",
  'ctime': string; // "2021-03-13 00:01:34",
  'status': '1' | '4'; // "1"
}

export type TAction = ReturnType<typeof model.actions> & typeof model.reducers;

export type IState = typeof model.state;

export interface IProps extends IBasicState, TAction, IState, FormComponentProps { }
