/* eslint-disable */
import memoizeOne from 'memoize-one';
import { menus } from '@/config/menu.conf';

const generateMenu = (power) => {
  const newMenus = menus.map((item) => {
    // power 中不存在 key，为了处理“首页”
    if (item.key === '/') {
      return item;
    }
    if (!item.isMenu ) return null;

    // power 中存在 key && 菜单不存在子菜单
    if (!item.children) {
      return {
        ...item,
        auth:{view: 1},
      };
    }
    // power 中存在 key && 菜单存在子菜单
    // const temp = item.children.map((ele) => ({
    //   ...ele,
    //   auth: power[item.key][ele.key],
    // }));
    const temp = item.children
      .map((ele) => {
        if (item.isMenu) {
          return {
            ...ele,
            auth: {view: 1},
          };
        }
        return null;
      })
      .filter(Boolean);
    if (temp.length === 0) {
      return null;
    }
    return {
      ...item,
      children: temp,
    };
  });
  return newMenus.filter(Boolean);
};

export default memoizeOne(generateMenu);
