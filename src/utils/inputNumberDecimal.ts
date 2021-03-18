

/**
 * 将用户的输入采用去一法转换成四位小数以内的数
 * @param value 原始值
 * @param decimal 精度
 * @returns {string} 返回值为字符串格式
 * 注：主要用于InputNumber组件的formatter/parser，因此暂时未解耦
 */
export const inputNumberDecimal = (value:any, decimal:any) => {
  let formatterValue = 0;
  // eslint-disable-next-line
  if (isNaN(value) && value !== '-') {
    // eslint-disable-next-line
    if (!isNaN(parseFloat(value))) {
      formatterValue = parseFloat(value);
    }
  } else {
    formatterValue = value;
  }
  const str = formatterValue.toString();
  if (str.includes('.')) {
    const a = str.split('.')[0];
    const b = str.split('.')[1].slice(0, decimal);
    return `${a}.${b}`;
  }
  return str;
};

/**
 * 四舍五入保留num位小数
 * @param v
 * @param num 保留位数
 * @param isZeroFill 默认补0；false-不补
 * @returns {*}
 */
export function inputNumberDecimalRound(v:any, num:any, isZeroFill:any) {
  let f = parseFloat(v);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(f)) {
    return 0;
  }
  // eslint-disable-next-line no-restricted-properties
  f = Math.round(v * (Math.pow(10, num))) / Math.pow(10, num);
  let s = f.toString();
  if (isZeroFill !== false) {
    let rs = s.indexOf('.');
    if (num > 0 && rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + num) {
      s += '0';
    }
  }
  return s;
}

// 保留2位小树
export function returnFloat(input:string | number):string {
  let value:any = Math.round(parseFloat(input.toString()) * 100) / 100;
  const xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = `${value.toString()}.00`;
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = `${value.toString()}0`;
    }
    return value;
  }
  return '0.00';
}

// 无视几位小数 不四舍五入 补齐两位小树
export function returnFloatInputLimit(input: string | number): string {
  let value: any = Math.round(parseFloat(input.toString()) * 100000000) / 100000000;
  const xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = `${value.toString()}.00`;
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = `${value.toString()}0`;
    }
    return value;
  }
  return '0.00';
}