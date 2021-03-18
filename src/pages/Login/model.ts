import { servicePostLogin } from './services';
import { NAME_SPACE } from './constants';
import { IPostParams } from './types';
import { message } from 'antd';

const initPostParams: Partial<IPostParams> = {

};

// const MOCK = { "id": "1", "ucard": "610121120000000000", "uname": "\u5f20\u9a70\u9633", "realname": "", "phone": "13333333333", "school": "\u56db\u4e2d", "schoolename": "", "province": "\u5317\u4eac", "head": "", "email": "1130@qq.com", "age": "18", "utype": "2", "ctime": "0", "status": "1", "uid": "1", "token": "43ce2fc4fd9a00cd9613b6cb67a777c8", "expired": 1615657117 }
export const model = {
  state: {
    postParams: { ...initPostParams },
  },
  reducers: {
    setState(state: any, store: any) {
      return { ...state, ...store };
    },
  },
  actions: (params: { dispatch: { [key: string]: any }; getState: Function }) => {
    const { dispatch: { [NAME_SPACE]: store, basic }, getState } = params;
    return {
      state() {
        return getState()[NAME_SPACE];
      },
      postPostLogin(params: IPostParams) {
        servicePostLogin(params).then((d: any) => {
          basic.updateUserInfo(d);
          message.success('提交成功');
        })
      }
    };
  },
};

export default { [NAME_SPACE]: model };
