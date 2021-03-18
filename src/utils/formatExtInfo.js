/**
 * 格式化ext_info方法
 * 将 { id: name } ==> [{ value: id, label: name }];
 */
export default (obj, disable) => {
  if (!obj || JSON.stringify(obj) === '{}') return [];
  const arr = Object.entries(obj);
  return arr.map((itemArr) => {
    const itemObj = {};
    itemObj.value = itemArr[0];
    itemObj.label = itemArr[1];
    if (disable) {
      itemObj.disabled = false;
    }
    return itemObj;
  });
};

export const formatIndustry = (obj) => {
  if (!obj || JSON.stringify(obj) === '{}') return [];
  const arr = Object.entries(obj);
  return arr.map((itemArr) => {
    const itemObj = {};
    itemObj.value = itemArr[1];
    itemObj.label = itemArr[1];
    return itemObj;
  });
};
