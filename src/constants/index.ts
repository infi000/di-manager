// eslint-disable-next-line prefer-destructuring
export const PROJECT_ENV = process.env.PROJECT_ENV;

// 商户映射枚举
export const MERCHANT_INFO_LIST = new Map<any, number>([]);
export const MERCHANT_ARR = (arr: Array<any>) =>
  arr.map((txt: any) => MERCHANT_INFO_LIST.get(txt));

export const PAGE_SIZE = 20;

export enum EUtype {
  '学生' = '1',
  '领队' = '2',
  '裁判' = '3',
  '会员号' = '100'
}

/**
 * 支付状态
 */
export enum EIsPay {
  '未支付' = '0',
  '支付成功' = '1',
  '支付失败' = '4'
}

/**
 * 支付方式
 */

 export enum EPayType {
  '未支付' = '0',
  '在线支付' = '1',
  '线下支付' = '2'
}


/**
 * 用户角色
 */
export const UTYPE_MAP = new Map<keyof typeof EUtype, EUtype>([
  ['学生', EUtype['学生']],
  ['领队', EUtype['领队']],
  ['裁判', EUtype['裁判']],
  ['会员号', EUtype['会员号']],
])

/**
 * 支付状态
 */
export const ISPAY_MAP = new Map<keyof typeof EIsPay, EIsPay>([

])

/**
 * 年龄组别
 */
 export const AGE_TYPE_ARR: TAgeType[] = ['EL', 'ML', 'SL', 'UL', 'RS', 'FF低龄', 'FF高龄'];


export const XUANCHUAN_URL = '/xuanchuan.jpg';
export const BG_URL = '/bg.png';

export const WEPAY_URL = '/wepay.png';
export const ALIPAY_URL = '/alipay.jpg';
export const WEPAYINFO_URL = '/wepayinfo.png';
export const ALIPAYINFO_URL = '/alipayinfo.png';





export const BG_COLOR = '#fef3e8';