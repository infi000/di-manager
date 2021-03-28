import { servicePostLogin } from './services';
import { NAME_SPACE } from './constants';
import { IPostParams } from './types';
import { message } from 'antd';

const initPostParams: Partial<IPostParams> = {

};

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
          message.success('提交成功');
          basic.updateUserInfo(d);
        })
      }
    };
  },
};

export default { [NAME_SPACE]: model };
