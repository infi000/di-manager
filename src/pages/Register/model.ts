import { servicePostRegister } from './services';
import { NAME_SPACE } from './constants';
import { IPostParams } from './type';
import { message } from 'antd';

const initPostParams: Partial<IPostParams> = {
  uname: undefined,
  phone: undefined,
  utype: undefined,
  pass: undefined,
  province: undefined,
  realname: undefined,
  age: undefined,
  school: undefined,
  schoolename: undefined,
  ucard: undefined, // 身份证
  head: undefined,
  email: undefined,
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
      updatePostParams(params: IPostParams) {
        store.setState({ postParams: { ...params } })
      },
      postRegister() {
        const { postParams } = store.state();
        servicePostRegister(postParams).then(() => { message.success('提交成功');}).catch((err: any) => console.log(err))
      }
    };
  },
};

export default { [NAME_SPACE]: model };
