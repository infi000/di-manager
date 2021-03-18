import Big from 'big.js';
// 参考https://juejin.im/post/6844903862755655694

/**
 * 加法运算 1 + 2 =3
 * @param num1 数字1
 * @param num2 数字2
 * @return number
 * @e.g plus(1,2) = 3
 */
export const plus = (num1: number, num2: number): number => {
    const x = new Big(num1);
    const y = x.plus(num2);
    return Number(y.toString());
}

/**
 * 减法运算 0.3 - 0.1  = 0.2
 * @param num1 数字1
 * @param num2 数字2
 * @return number
 * @e.g minus(1,2) = -1
 */
export const minus = (num1: number, num2: number): number => {
    const x = new Big(num1);
    const y = x.minus(num2);
    return Number(y.toString());
}

/**
 * 乘法运算 0.6 * 3 // 1.7999999999999998
 * @param num1 数字1
 * @param num2 数字2
 * @return number
 * @e.g times(0.6,3) = 1.8
 */
export const times = (num1: number, num2: number): number => {
    const x = new Big(num1);
    const y = x.times(num2);
    return Number(y.toString());
}

/**
 * 除法运算 0.6 / 3 // 0.2
 * @param num1 数字1
 * @param num2 数字2
 * @return number
 * @e.g div(0.6,3) = 0.2
 */
export const div = (num1: number, num2: number): number => {
    const x = new Big(num1);
    const y = new Big(num2);
    return Number(x.div(y).toString());
}

export default { plus, minus, times, div };