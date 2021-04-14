import { serviceGetUserInfo } from './services';

const DEFAULT_USERINFO: Partial<IUserInfo> = {
  mname: undefined,
  phone: undefined,
  mtype: undefined,
  id: undefined,
  uid: undefined,
  status: undefined,
  ctime: undefined
}

const model = {
  state: {
    isLoading: false,
    powerInfo: {}, // 没用
    merchantId: '', // 没用
    userInfo: { ...DEFAULT_USERINFO }, // 用户信息
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
        if(params.mtype){
          localStorage.setItem('mtype', params.mtype);
        }
        if(Number(params.id) == 2){
          window.location.href = '/di/gradeExport';
        }
      },
      async checkLogin() {
        basic.setState({ isLoading: true });
        try {
          const d: IUserInfo= await serviceGetUserInfo();
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
