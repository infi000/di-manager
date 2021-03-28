import { model } from './model';
import { EIsPay } from '@/constants';

/**
 * 页面展示的内容
 */
export type TContentType = 'createTeam' | 'showTeam' | 'createOrder' | 'showPayInfo';


/**
 *创建队伍参数
 *
 * @export
 * @interface IPostParams
 */
export interface IPostParams {
  tname: string;
  age: string;
  uid: string; // 用户id
  phone: number;
  school: string;
  sid: string; // 比赛id
  qid: string; // 题目id
  tename?: string;// 英文名
  schoolename?: string;
  province?: string;
  city?: string;
  email?: string;
}

/**
 *  队伍列表
 *
 * @export
 * @interface ITableParams
 */
export interface ITableParams {
  tname: string;
  ispay: EIsPay;
  url: string;
  tcode: string;// 会员号
  pass: string; //会员号密码

}

/**
 * 添加队员参数
 *
 * @export
 * @interface IPostTeamMember
 */
export interface IPostTeamMember {
  tid: string;
  realname: string;
  age: number;
  uphone: number;
  head?: string;
  email?: string;
}

/**
 * 题目信息参数
 */
export interface IQuestionItem { id: string; sid: string; title: string;[key: string]: string }; 

/**
 * 付款订单创建参数
 */
export interface IOrderParams {
  tid: string;  // 队伍id
  remark?: string;  // 备注
  money: string;  // 金额，单位元，两位小数
  isneedbill: "1" | "0";  // 是否需要发票，1需要，0不需要
  paytype?: 'wxpay' | 'alipay' | 'unionpay' | 'other'; // 付款方式，wxpay、alipay、unionpay、other 
  company?: string; // 单位开票抬头
  companycode?: string; // 单位纳税识别号
  billdetail?: '注册服务费'|'活动服务费'|'会议服务费'|'会务服务费'; // 开票内容（注册服务费/活动服务费/会议服务费/会务服务费）
  billtype?: "1" | "2"; // 发票种类，1电子发票，2纸质发票
  email?: string; // 邮件地址
  address?: string; // 邮寄地址
  uname?: string; // 收件人
  phone?: string; // 联系电话
  invoicetype:"1" | "2" ; // 1增值税专用发票，2增值税普通发票
  bank:string; // 开户行名称
  bankcard:number; // 卡号
}


export type TAction = ReturnType<typeof model.actions> & typeof model.reducers;

export type IState = typeof model.state;
