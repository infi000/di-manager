import { message } from 'antd';
import qs from 'qs';
import { serviceGetTableList, servicePostCreate, servicePostModify } from './services';
import { NAME_SPACE } from './constants';
import { IModifyParams, ICreateParams, IState, ITableItem } from './type';

const state: {
  tableList: ITableItem[];
  serchParams: {};
  sid: string;
  createParams: Partial<ICreateParams>;
  modalData: TModalData<ITableItem | {}>;
  tablePage: TPage;
  tableListTotal: number;
} = {
  tableList: [],
  tableListTotal: 0,
  tablePage: { page_no: 1, page_size: 20 },
  serchParams: {},
  createParams: {},
  sid: '',
  modalData: { show: false, data: {} },
};

export const model = {
  state,
  reducers: {
    setState(state: any, payload: any) {
      return { ...state, ...payload };
    },
  },
  actions: (p: { dispatch: { [key: string]: any }; getState: Function }) => {
    const { dispatch: { [NAME_SPACE]: store, basic }, getState } = p;
    return {
      state() {
        return getState()[NAME_SPACE];
      },
      resetState() {
        store.setState(state);
      },
      updateSid(params: IState['sid']) {
        store.setState({ sid: params });
      },
      updataSerchParams(params: IState['serchParams']) {
        params && store.setState({ serchParams: { ...params } });
      },
      updateModalData(params: IState['modalData']) {
        params && store.setState({ modalData: { ...params } });
      },
      updateTableList(params: IState['tableList']) {
        params && store.setState({ tableList: [...params] });
      },
      updateTableListTotal(params: IState['tableListTotal']) {
        store.setState({ tableListTotal: params });
      },
      updateTablePage(params: number) {
        store.setState({ tablePage: { page_no: params, page_size: 20 } });
      },
      postCreate(params: ICreateParams) {
        const { sid } = store.state();
        servicePostCreate({ ...params, sid }).then(() => {
          message.success('提交成功');
          store.updateModalData({ show: false, data: {} });
          store.getTableList();
        }).catch((err: any) => console.log(err));
      },
      postModify(params: IModifyParams) {
        const { sid } = store.state();
        servicePostModify({ ...params, sid }).then(() => {
          message.success('提交成功');
          store.updateModalData({ show: false, data: {} });
          store.getTableList();
        }).catch((err: any) => console.log(err));
      },
      getTableList(params?: IState['serchParams']) {
        params && store.updataSerchParams(params);
        const _params = params || store.state().serchParams;
        const { tablePage } = store.state();
        const { page_size, page_no } = tablePage;
        const offset = (page_no - 1) * page_size;
        const { sid } = store.state();
        serviceGetTableList({ ..._params, sid, offset, count: page_size }).then((d: any) => {
          const { total = 0, questions = [] } = d;
          store.updateTableList(questions || []);
          store.updateTableListTotal(total);
        }).catch((err: any) => console.log(err));
      },
      getChangePage(page: number) {
        store.updateTablePage(page);
        store.getTableList();
      }
    };
  },
};

export default { [NAME_SPACE]: model };
