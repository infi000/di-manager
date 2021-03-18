import { UTYPE_MAP } from '@/constants';
import { IOrderParams } from './type';
export const NAME_SPACE = 'teamManage';

export const UTYPE_OPTION = Array.from(UTYPE_MAP).map(item => {
  const [label, value] = item;
  return { label, value };
})

/**
 * 是否需要发票，1需要，0不需要
 */
export const NEEDBILL_MAP = new Map<IOrderParams['isneedbill'], '需要' | '不需要'>([
  ['1', '需要'],
  ['0', '不需要'],
]);

/**
 * 付款方式
 */
export const PAYTYPE_MAP = new Map<IOrderParams['paytype'], '微信' | '支付宝' | '网银' | '其它'>([
  // ['wxpay', '微信'],
  // ['alipay', '支付宝'],
  ['unionpay', '网银'],
  // ['other', '其它'],
])
/**
 * 发票种类
 */
export const BILLTYPE_MAP = new Map<IOrderParams['billtype'], '电子发票' | '纸质发票'>([
  ['1', '电子发票'],
  ['2', '纸质发票'],
])

/**
 * 开票内容
 */
export const BILLDETAIL_ARR: Array<IOrderParams['billdetail']> = ['注册服务费','活动服务费','会议服务费','会务服务费'];

/**
 * 增值税发票 普通or专用
 */
export const INVOICETYPE_MAP = new Map<IOrderParams['invoicetype'],'增值税专用发票'|'增值税普通发票'>([
  ['1','增值税专用发票'],
  ['2','增值税普通发票'],
])



export const AGE_ARR = ['RS', 'EL', 'ML', 'SL', 'UL'];
export default {};