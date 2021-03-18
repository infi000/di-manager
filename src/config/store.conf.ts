import createStore from '@/store/createStore';

// 基本
import basic from '@/basic/model';
// 注册
import register from '@/pages/Register/model';
// 登陆
import login from '@/pages/Login/model';
// 创建队伍
import TeamManager from '@/pages/TeamManager/model';

const models = {
  // 基本
  basic,
  ...register,
  ...TeamManager,
  ...login
};

export default createStore(models);
