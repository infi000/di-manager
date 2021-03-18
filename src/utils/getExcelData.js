import * as XLSX from 'xlsx';

// 获取excel数据
const getExcel = (files, kesMap = 'A') =>
  new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(files);
      fileReader.onload = (e) => {
        const { result } = e.target;
        const workbook = XLSX.read(result, { type: 'binary' });
        const { Sheets = {}, SheetNames = [] } = workbook;
        const data = XLSX.utils.sheet_to_json(Sheets[SheetNames[0]], {
          range: 1, // 跳过第一行
          header: kesMap, // key值对应
          raw: false, // 统一转成字符串
          defval: null, // 空行为null
          blankrows: true, // 显示空行
        });
        resolve(data);
      };
    } catch (e) {
      reject(e);
    }
  })
    .then((res) => res)
    .catch();

export default getExcel;
