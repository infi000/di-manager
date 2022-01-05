import { message } from 'antd';
import qs from 'qs';
import { serviceGetTableList, servicePostAudit, servicePostBatch, servicePostCreate, servicePostDel, servicePostModify } from './services';
import { NAME_SPACE } from './constants';
import { IState, ITableItem, TStatus } from './type';

const state: {
  tableList: ITableItem[];
  serchParams: {};
  tablePage: TPage;
  modalData: TModalData<ITableItem | {}>;
  tableListTotal: number;
} = {
  tableList: [],
  tableListTotal: 0,
  tablePage: { page_no: 1, page_size: 20 },
  serchParams: {},
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
      updateTableList(params: IState['tableList']) {
        store.setState({ tableList: [...params] });
      },
      updateTableListTotal(params: IState['tableListTotal']) {
        store.setState({ tableListTotal: params });
      },
      updateTablePage(params: number) {
        store.setState({ tablePage: { page_no: params, page_size: 20 } });
      },
      updateModalData(params: IState['modalData']) {
        params && store.setState({ modalData: { ...params } })
      },
      /**
       * 获取列表
       *
       * @param {IState['serchParams']} [params]
       */
      getTableList(params?: IState['serchParams']) {
        params && store.updataSerchParams(params);
        const { tablePage } = store.state();
        const { page_size, page_no } = tablePage;
        const offset = (page_no - 1) * page_size;
        const { aid } = basic.state().userInfo;
        serviceGetTableList({
          aid, offset, count: page_size
        }).then((d) => {
          console.log(d);
          const { total = 0, news } = d;
          store.updateTableList(news || []);
          store.updateTableListTotal(total);
        }).catch((err: any) => console.log(err));
      },
      /**
       *审核
       *
       * @param {({uid: string; status: TStatus})} params
       */
      postAudit(params: { uid: string; status: TStatus }) {
        servicePostAudit(params).then(() => {
          store.getTableList();
        });
      },
      /**
       *分页
       *
       * @param {number} page
       */
      getChangePage(page: number) {
        store.updateTablePage(page);
        store.getTableList({ show: false, data: { uids: '' }, type: 'batchAdd' },);
      },
      postCreate(params: any) {
        servicePostCreate({ ...params }).then(() => {
          message.success('提交成功');
          store.updateModalData({ show: false, data: {} });
          store.getTableList();
        }).catch((err: any) => console.log(err))
      },
      postModify(params: any) {
        console.log(params);
        servicePostModify({ ...params }).then(() => {
          message.success('提交成功');
          store.updateModalData({ show: false, data: {} });
          store.getTableList();
        }).catch((err: any) => console.log(err))
      },
      postDel(params: any) {
        servicePostDel({ ...params }).then(() => {
          message.success('删除成功');
          store.getTableList();
        }).catch((err: any) => console.log(err))
      },
    };
  },
};

export default { [NAME_SPACE]: model };
