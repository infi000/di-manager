import { EIsPay, EPayType } from '@/constants/index';
export const NAME_SPACE = 'SignUpManager';
export const DATE_FORMAT = 'YYYY-MM-DD';

export const IS_PAY: { [key in EIsPay]: keyof typeof EIsPay } = {
  '0': '未支付',
  '1': '支付成功',
  '4': '支付失败',
}

export const PAY_TYPE: { [key in EPayType]: keyof typeof EPayType } = {
  '0': '未支付',
  '1': '在线支付',
  '2': '线下支付',
}

export default {};