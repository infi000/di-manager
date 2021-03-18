import { serviceGetUserInfo } from './services';

const DEFAULT_USERINFO: Partial<IUserInfo> = {
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
}
const model = {
  state: {
    isLoading: false,
    powerInfo: {}, // 没用
    merchantId: '', // 没用
    userInfo: { ...DEFAULT_USERINFO }, //用户信息
  },
  reducers: {
    setState(state: any, partialState: any) {
      return { ...state, ...partialState };
    },
  },
  actions: (params: { dispatch: { [key: string]: any }; getState: Function }) => {
    const { dispatch: { basic }, getState } = params;
    return {
      state() {
        return getState().basic;
      },
      updateUserInfo(params: IUserInfo & {token?:string}) {
        basic.setState({ userInfo: {...params} });
        if(params.token){
          localStorage.setItem('token', params.token);
        }
        if(params.utype){
          localStorage.setItem('utype', params.utype);
        }
      },
      async checkLogin() {
        basic.setState({ isLoading: true });
        try {
          const d: IUserInfo= await serviceGetUserInfo();
          console.log("d",d);
          if (d) {
            basic.updateUserInfo({ ...d });
          }
          basic.setState({ isLoading: false });
        } catch (e) {
          basic.setState({ isLoading: false });
        }
      },
    }
  }
};

export default model;
