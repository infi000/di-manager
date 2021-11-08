// 基本类型
// 字典
declare type Dictionary<T> = {
  [key: string]: T;
};

/**
 * 将T类型中的S属性变为必填
 */
declare type TSomeRequired<T, S extends keyof T> = Omit<T, S> &
  {
    [key in S]-?: T[S];
  };

/**
 * 弹窗类型
 */
declare type TModalData<T = Dictionary<any>> = {
  show: boolean;
  type?: 'create' | 'edit' | 'view';
  data: T;
}
declare interface IFetchParams {
  type?: 'GET' | 'POST';
  params: object;
  notFormat?: boolean;
  errMsg?: string;
  [key: string]: any;
}
declare type fetch = (url: string, params: IFetchParams) => Promise<any>;

declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}


declare type MerchantShowArr = Array<{ type: any; fn: () => boolean }>;

declare namespace SofaAction {
  // redux action
  type Action = {
    type: string;
    payload?: any;
    // loading 状态触发的Action
    loadingAction?: (loading: boolean) => Action;
    loadingSubmit?: ([]: string[]) => Action;
    // 异步Action调用的服务端服务
    service?: any; // TODO 搞半天没成功，放弃了；
    // 异步Action调用参数
    params?: object;
    // 异步Action调用成功后的Action
    success?: Action | ActionCreator | any;
  };
  // redux action creator
  type ActionCreator = (params?: any, callback?: any) => Action;
}
declare type SyncAction<T> = (payload: T) => { type: string; payload: T };
declare type AsyncAction<T> = (payload: T) => Promise<T>;

declare interface IReducerStoreResult<S, A> {
  state: S;
  dispatch: Function;
  action: A;
}

/**
 * 页面分页
 */
declare type TPage = { page_no: number; page_size: number };

/**
 * 借口分页
 */
declare type TPageFetch = { count: number; offset: number };


declare type TFetchMsg<T> = { res: 'succ' | 'err'; errdata: string; data: Dictionary<T> };
/**
 * 年龄组别
 */
declare type TAgeType = 'RS' | 'EL' | 'ML' | 'SL' | 'UL' | 'FF低龄' | 'FF高龄';


enum EMtype {
  '超级管理员' = '1',
  '普通管理员' = '2',
}

enum EStatus {
  '正常' = '1',
  '删除' = '-1',
}


/**
 * 用户信息
 */
declare interface IUserInfo {
  id?: string;
  aid?:string;
  uid?: string;
  mname: string;
  phone: number;
  mtype: EMtype;
  status: EStatus;
  ctime?: string;
}


declare interface IBasicState {
  userInfo: IUserInfo;
  history: any;
  areas: { id: string; aname: string; city: string; describe: string; status: string }[]
}
