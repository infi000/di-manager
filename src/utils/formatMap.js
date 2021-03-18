// 处理映射关系
export default (obj) => {
  if (!obj) {
    return [];
  }
  return Object.entries(obj).map(([id, label]) => ({
    id,
    label,
  }));
};
