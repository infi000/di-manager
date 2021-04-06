import { serviceGetTableList, servicePostCreate, servicePostModify } from './services';
import { NAME_SPACE } from './constants';
import { IModifyParams, ICreateParams, IState, ITableItem } from './type';
import { message } from 'antd';

const state: {
  tableList: ITableItem[];
  serchParams: {};
  qid: string;
  createParams: Partial<ICreateParams>;
  modalData: TModalData<ITableItem | {}>;
  tableListTotal: number;
} = {
  tableList: [],
  tableListTotal: 0,
  serchParams: {},
  createParams: {},
  qid: '',
  modalData: { show: false, data: {} },
}

export const model = {
  state,
  reducers: {
    setState(state: any, payload: any) {
      return { ...state, ...payload };
    },
  },
  actions: (params: { dispatch: { [key: string]: any }; getState: Function }) => {
    const { dispatch: { [NAME_SPACE]: store, basic }, getState } = params;
    return {
      state() {
        return getState()[NAME_SPACE];
      },
      resetState() {
        store.setState(state);
      },
      updateQid(params: IState['qid']) {
        store.setState({ qid: params })
      },
      updataSerchParams(params: IState['serchParams']) {
        params &&  store.setState({ serchParams: { ...params } })
      },
      updateModalData(params: IState['modalData']) {
        params &&  store.setState({ modalData: { ...params } })
      },
      updateTableList(params: IState['tableList']) {
        params &&   store.setState({ tableList: [...params] })
      },
      updateTableListTotal(params: IState['tableListTotal']) {
        store.setState({ tableListTotal: params })
      },
      postCreate(params: Omit<ICreateParams,"qid">) {
        const { qid } = store.state();
        servicePostCreate({...params,qid}).then(() => {
          message.success('提交成功');
          store.updateModalData({ show: false, data: {} });
          store.getTableList();
        }).catch((err: any) => console.log(err))
      },
      postModify(params: IModifyParams) {
        console.log(params);
        servicePostModify({...params}).then(() => {
          message.success('提交成功');
          store.updateModalData({ show: false, data: {} });
          store.getTableList();
        }).catch((err: any) => console.log(err))
      },
      getTableList(params?: IState['serchParams']) {
        params && store.updataSerchParams(params)
        const _params = params || store.state().serchParams;
        const { qid } = store.state();
        serviceGetTableList({ ..._params, qid }).then((d: any) => {
          const { total = 0, judgetypes = [] } = d;
          store.updateTableList(judgetypes || []);
          store.updateTableListTotal(total);
        }).catch((err: any) => console.log(err))
      },
    };
  },
};

export default { [NAME_SPACE]: model };
