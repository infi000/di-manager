import createStore from '@/store/createStore';
// 基本
import basic from '@/basic/model';
// 登陆
import login from '@/pages/Login/model';
// 赛事管理
import gameManager from '@/pages/GameManager/model';
// 赛事题目管理
import gameTopicManager from '@/pages/GameTopicManager/model';
// 赛事题目-文件描述
import gameFileDesc from '@/pages/GameFileDesc/model';
// 赛事题目-评分标准
import gameJudgeManager from '@/pages/GameJudgeManager/model';
// 赛事题目-评分标准
import gameReffer from '@/pages/GameReffer/model';
// 赛事题目-评分标准
import refferManager from '@/pages/RefferManager/model';
import refferAllot from '@/pages/RefferAllot/model';
// 比赛发布
import gameRelease from '@/pages/GameRelease/model';
// 领队管理
import leaderManager from '@/pages/LeaderManager/model';
// 报名列表
import signUpManager from '@/pages/SignUpManager/model';


const models = {
  basic,
  ...login,
  ...gameManager,
  ...gameTopicManager,
  ...gameRelease,
  ...signUpManager,
  ...gameFileDesc,
  ...gameJudgeManager,
  ...gameReffer,
  ...refferManager,
  ...refferAllot,
  ...leaderManager
};

export default createStore(models);
