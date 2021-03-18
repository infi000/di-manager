// 格式化数据
export default (params) => {
  const par = { ...params };
  if (par.work_city && par.work_city[1]) {
    par.work_city = par.work_city[1];
  } else if (par.work_city && (par.work_city[0] || par.work_city[0] === 0)) {
    par.work_city = par.work_city[0];
  }
  if (par.dataPicker && par.dataPicker[1]) {
    par.start_date = par.dataPicker[0].format('YYYYMMDD');
    par.end_date = par.dataPicker[1].format('YYYYMMDD');
    delete par.dataPicker;
  }
  return par;
};
