import { FormComponentProps } from 'antd/lib/form';
import { EIsPay, EPayType } from '@/constants/index';
import { model } from './model';


/**
 * 查询项
 */
export interface ISearch {
  sid?: string; // 赛程id
  qid?: string; // 题目id
  tname?: string;// 队伍名称，模糊搜索
  organ?: string; // 归属机构类型，1学校，2机构
  age?: string;// 年龄组，（级别：RS、EL、ML、SL、UL）
  qtype?: string;// 题目类型，1默认（可选题），2即时（默认选中题）
  tcode?: string;// 挑战号
  ispay?: string;// 是否支付1支付成功，0未支付，4支付失败
  count?: string; // 获取的数量（默认10）
  offset?: string; // 获取的偏移量（默认0）
}

/**
 * 列表项
 */
export interface ITableItem {
  'id': string;//  "735",
  'tname': string;//  "测试队伍4",
  'tename': string;//  "ceshiduiwu1",
  'age': string;//  "RS",
  'tcode': string;//  "",
  'password': string;//  "",
  'createuid': string;//  "4",
  'realname': string;//  "测试裁判1",
  'canchange': string;//  "1",
  'phone': string;//  "10000000000",
  'school': string;//  "北京小学",
  'schoolename': string;//  "beijingxiaoxue",
  'province': string;//  "北京市",
  'city': string;//  "东城区",
  'email': string;//  "Qaaa@126.com",
  'ispay': EIsPay;//  "0",
  'paytype': EPayType;//  "0",
  'sid': string;//  "1",
  'isneedbill': string;//  "0",
  'url': string;//  "",
  'urlqcode': string;//  "",
  'ctime': string;//  "2021-03-21 12:string;// 58:string;// 48",
  'status': string;//  "1",
  'signupmoney': string;//  "3860.00",
  qdata: {
    'id': string; //  "2",
    'title': string; //  "题目2",
    'content': string; //  "题目简述",
    'guidepath': string; //  "",
    'challengepath': string; //  "",
    'trainbookpath': string; //  "",
    'sid': string; //  "1",
    'usermincount': string; //  "2",
    'sort': string; //  "7",
    'ctime': string; //  "2021-03-13 00:27:59",
    'status': string; //  "1"
  }[];//  null,
  users: {
    age: string;//  "20"
    email: string;//  "QUaaa@126.com"
    phone: string;//  ""
    province: string;//  ""
    realname: string;//  "测试队员5"
    school: string;//  ""
    schoolename: string;//  ""
    status: string;//  "1"
    ucard: string;//  ""
    uid: string;//  "3"
    uname: string;//  ""
  }[];
}

/**
 * 发票详情
 */
export interface IInvoiceDetail {
  'id': string; //  "2",
  'tid': string; //  "1",
  'company': string; //  "单位开票抬头",
  'companycode': string; //  "单位纳税识别号",
  'money': string; //  "0.01",
  'billdetail': string; //  "注册服务费",
  'invoicetype': string; //  "1",
  'billtype': string; //  "2",
  'bank': string; //  "",
  'bankcard': string; //  "",
  'email': string; //  "",
  'address': string; //  "北京市",
  'uname': string; //  "收件人",
  'phone': string; //  "10000000000"

}

export interface IVerifypay {
  tid: string;
  ispay: EIsPay;
}

export interface ISetcode {
  tid: string;
  tcode: string;
}

export type TAction = ReturnType<typeof model.actions> & typeof model.reducers;

export type IState = typeof model.state;

export interface IProps extends IBasicState, TAction, IState, FormComponentProps { }
