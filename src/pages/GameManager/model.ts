import { message } from 'antd';
import { servicePostCreate, serviceGetTableList, servicePostModify, serviceOpen, serviceClose } from './services';
import { NAME_SPACE } from './constants';
import { ICreateParams, IModifyParams, ITableItem, IState } from './type';

const state: {
  tableList: ITableItem[];
  serchParams: {};
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
        servicePostCreate(params).then(() => {
          message.success('提交成功');
          store.updateModalData({ show: false, data: {} });
          store.getTableList();
        }).catch((err: any) => console.log(err));
      },
      postModify(params: IModifyParams) {
        servicePostModify(params).then(() => {
          message.success('提交成功');
          store.updateModalData({ show: false, data: {} });
          store.getTableList();
        }).catch((err: any) => console.log(err));
      },
      postOpen(sid: string) {
        serviceOpen({ sid }).then(() => {
          message.success('提交成功');
          store.getTableList();
        }).catch((err: any) => console.log(err));
      },
      postClose(sid: string) {
        serviceClose({ sid }).then(() => {
          message.success('提交成功');
          store.getTableList();
        }).catch((err: any) => console.log(err));
      },
      getTableList(params?: IState['serchParams']) {
        params && store.updataSerchParams(params);
        const _params = params || store.serchParams;
        const { tablePage } = store.state();
        const { page_size, page_no } = tablePage;
        const offset = (page_no - 1) * page_size;
        serviceGetTableList({ ..._params, offset, count: page_size }).then((d: any) => {
          const { total = 0, schedules = [] } = d;
          store.updateTableList(schedules || []);
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
