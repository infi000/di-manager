/* eslint-disable */
/**
 * [设置cookie]
 * @param {[string]} cookie key
 * @param {[string]} cookie value
 * @author lichun
 */

import qs from 'qs';

// 获取路由参数
export const getParamsFromUrl = () => {
  const str = window.location.href.split('?')[1] || '';
  return qs.parse(str);
};

export function setCookie(name, value) {
  const now = new Date();
  now.setDate(now.getDate() + 1000 * 60 * 60 * 24 * 30);
  // tslint:disable-next-line: no-console
  console.log('在设置cookie时新增了SameSite=Lax;在某些情况下可能有限制，关注');
  const str = `${name}=${value};expires=${now.toUTCString()};path=/;SameSite=Lax;`;
  document.cookie = str;
}

/**
 * [得到cookie]
 * @param {[string]} cookie key
 * @returns {[string]} value
 * @author lichun
 */
export function getCookie(name) {
  let start;
  let end;

  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(`${name}=`);

    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
}

// customer-project 数据处理 值为code
export const formatAllCustomerProjectInfo = (data) => {
  const allCustomers = data && data.length > 0 ? data : [];
  const entityList = allCustomers.map((item) => ({
    value: item.customer_code,
    label: `(${item.customer_code})${item.customer_name}`,
    children: item.project_list.map((proj) => ({
      value: proj.project_code,
      label: `(${proj.project_code})${proj.project_name}`,
    })),
  }));
  return [{ value: '', label: '全部' }].concat(entityList);
};
// customer-project 数据处理 值为code in ame
export const formatAllCustomerProjectInfo_all = (data) => {
  const allCustomers = data && data.length > 0 ? data : [];
  const entityList = allCustomers.map((item) => {
    const { customer_code, customer_id, customer_name } = item;
    const lv1_val = {
      customer_code,
      customer_id,
      customer_name,
    };
    return {
      value: JSON.stringify(lv1_val),
      label: `(${item.customer_code})${item.customer_name}`,
      children: item.project_list.map((proj) => {
        const { project_code, project_id, project_name } = proj;
        const lv2_val = {
          project_code,
          project_id,
          project_name,
        };
        return {
          value: JSON.stringify(lv2_val),
          label: `(${proj.project_code})${proj.project_name}`,
        };
      }),
    };
  });
  return entityList;
};

// 没有全部
export const formatCustomerProjectInfo = (data) => {
  const allCustomers = data && data.length > 0 ? data : [];
  const entityList = allCustomers.map((item) => ({
    value: item.customer_code,
    label: `(${item.customer_code})${item.customer_name}`,
    children: item.project_list.map((proj) => ({
      value: proj.project_code,
      label: `(${proj.project_code})${proj.project_name}`,
    })),
  }));
  return entityList;
};


// sleep
export const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

/**
 * Map数据个数转换成数组 [{label:'xxx'},{id:'xx'}]
 * @returns [{label:'xxx'},{id:'xx'}]
 */
export const formatMapToLabel = (obj) => {
  if (obj instanceof Map) {
    return [...obj.entries()].map(([value, label]) => ({
      value,
      label,
    }));
  }
  return [];
};

/**
 * 级联Cascader 忽略大小写检索
 */
export const filter = (inputValue, path) => {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
};
