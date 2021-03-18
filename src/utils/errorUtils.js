/**
 * 查看时历史无审核通过计价
 */
/* eslint-disable */

export class DetailNoAuthValuation extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'DetailNoAuthValuation';
    this.stack = new Error().stack;
  }
}
