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
        return servicePostLogin(params).then((d: any) => {
          message.success('ζδΊ€ζε');
          basic.updateUserInfo(d);
        });
      }
    };
  },
};

export default { [NAME_SPACE]: model };
