import { message } from 'antd';
import qs from 'qs';
import { serviceGetTableList, servicePostAudit, servicePostBatch } from './services';
import { NAME_SPACE } from './constants';
import { IState, ITableItem } from './type';

const state: {
  tableList: ITableItem[];
  serchParams: {};
  modalData: {
    show: boolean;
    type?: 'batchAdd';
    data: {uids: string};
};
  tablePage: TPage;
  tableListTotal: number;
} = {
  tableList: [],
  tableListTotal: 0,
  tablePage: { page_no: 1, page_size: 20 },
  serchParams: {},
  modalData: { show: false, data: { uids: '' }, type: 'batchAdd' },
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
      /**
       * 获取列表
       *
       * @param {IState['serchParams']} [params]
       */
      getTableList(params?: IState['serchParams']) {
        params && store.updataSerchParams(params);
        const _params = params || store.serchParams;
        const { tablePage } = store.state();
        const { page_size, page_no } = tablePage;
        const offset = (page_no - 1) * page_size;
        const { sid } = store.state();
        serviceGetTableList({
          ..._params, sid, offset, count: page_size
        }).then((d) => {
          console.log(d);
          const { total = 0, users = [] } = d;
          store.updateTableList(users || []);
          store.updateTableListTotal(total);
        }).catch((err: any) => console.log(err));
      },
      /**
       *审核
       *
       * @param {({uid: string; status: '1'| '4'})} params
       */
      postAudit(params: {uid: string; status: '1'| '4'}) {
        servicePostAudit(params).then(() => {
          // cb
          store.getTableList();
        });
      },
      /**
       *批量分配到比赛
       *
       * @param {{uids: string; sid: string}} params
       */
      postBatch(params: {uids: string; sid: string}) {
        servicePostBatch(params).then(() => {
          store.getTableList();
          store.updateModalData()
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
      }
    };
  },
};

export default { [NAME_SPACE]: model };
