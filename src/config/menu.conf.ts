/**
 * menus - 此文件是为了统一 menu 和 路由(两份文件有很多共通之处)。避免新加页面初始配置散落各地。
 * 原menu文件：src/basic/utils/generateMenu.js
 * 原route文件：src/App.js
 *
 * menu
 * @param {string} icon - menu 的 icon 图标
 * @param {string} name - menu 的名称
 * @param {string} path - menu 的地址(也是对应 route 的 path)
 * @param {string} key - menu 的权限
 * @param {boolen} isMenu - 是否是目录(区别目录和router)
 * @param {array} children - menu 的子目录
 *
 * route
 * @param {array} powerArr - route 的权限(menu每层的key可以组成powerArr)
 * @param {node} component - route 渲染的组件
 * @param {boolen} hasPower - route 的权限(没有对应的权限接口时可以用这个控制)
 *
 */

// load
import Loadable from 'react-loadable';
// base
import Loading from '@/pages/Loading';

type TMenuItem = {
  icon?: string;
  name?: string;
  path: string;
  key?: string;
  isMenu: boolean;
  auth?: any;
  platform?: string;
  hasPower?: boolean;
  powerArr?: Array<string>;
  component?: (React.ComponentClass<unknown, any> & Loadable.LoadableComponent) | (React.FunctionComponent<unknown> & Loadable.LoadableComponent);
  children?: Array<childItem>;
}
type childItem = TSomeRequired<TMenuItem, 'component'>;
const load = (loader: any) => Loadable({ loader, loading: Loading });
export const NotFound = load(() => import('@/pages/NotFound'));
export const NotPower = load(() => import('@/pages/NotPower'));

// 首页
const HomePage = load(() => import('@/pages/HomePage'));
const Login = load(() => import('@/pages/Login'));
const GameManager = load(() => import('@/pages/GameManager'));
const GameTopicManager = load(() => import('@/pages/GameTopicManager'));
const GameJudgeManager = load(() => import('@/pages/GameJudgeManager'));
const GameReffer = load(() => import('@/pages/GameReffer'));
const GameFileDesc = load(() => import('@/pages/GameFileDesc'));
const RefferManager = load(() => import('@/pages/RefferManager'));
const LeaderManager = load(() => import('@/pages/LeaderManager'));
const GameRelease = load(() => import('@/pages/GameRelease'));
const SignUpManager = load(() => import('@/pages/SignUpManager'));




// 单独页面 开发工具



// 不会验证权限和调用基础信息接口的白班路由
export const blankRoutes = [
  {
    path: '/login', // 登陆
    component: Login,
  },
];


export const menus: TMenuItem[] = [
  {
    path: '/gameManager', 
    component: GameManager,
    isMenu: true,
    name:'赛事管理',
  },
  {
    path: '/gameTopicManager', 
    component: GameTopicManager,
    isMenu: false,
    name:'赛事题目管理',
  },
  {
    path: '/gameFileDesc', 
    component: GameFileDesc,
    isMenu: false,
    name:'赛事题目-文件描述',
  },
  {
    path: '/gameJudgeManager', 
    component: GameJudgeManager,
    isMenu: false,
    name:'赛事题目-评分标准',
  },
  {
    path: '/gameReffer', 
    component: GameReffer,
    isMenu: false,
    name:'赛事题目-裁判类型',
  },
  {
    path: '/refferManager', 
    component: RefferManager,
    isMenu: true,
    name:'裁判管理',
  },
  // {
  //   path: '/gameRelease', 
  //   component: GameRelease,
  //   isMenu: true,
  //   name:'比赛发布',
  // },
  {
    path: '/leaderManager', 
    component: LeaderManager,
    isMenu: true,
    name:'领队管理',
  },
  {
    path: '/signUpManager', 
    component: SignUpManager,
    isMenu: true,
    name:'报名管理'
  },
];

const generateRoute = menus.reduce((arr, item: any) => {
  if (item.children && item.children.length) {
    const childrenItem = item.children.map((el: any) => ({
      ...el,
      powerArr: el.powerArr || [item.key, el.key, 'view'],
    }));
    return arr.concat(childrenItem);
  }
  return arr.concat({
    ...item,
    powerArr: item.powerArr || [item.key, item.key, 'view'],
  });
}, []);

export const routes = generateRoute;
