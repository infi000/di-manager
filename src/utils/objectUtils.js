export const isEmptyObject = (obj) => !Object.keys(obj).length;

export const isObject = (obj) => Object.prototype.toString.call(obj).slice(8, -1) === 'Object';

// 对象的值 去掉前后空格
export const trimObject = (obj) => {
  const objKeys = Object.keys(obj);
  const newObj = {};
  objKeys.forEach(item => {
    if (typeof obj[item] === 'string') {
      newObj[item] = obj[item].trim();
    }
  });
  return { ...obj, ...newObj };
};
