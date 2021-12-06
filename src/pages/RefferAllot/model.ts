import { message } from 'antd';
import qs from 'qs';
import { serviceGetTableList, servicePostSetJudge, serviceGetSdict } from './services';
import { NAME_SPACE } from './constants';
import { IState, ITableItem, TSdict } from './type';

const PAGE_SIZE = 1000;
const state: {
  tableList: ITableItem[];
  serchParams: {};
  modalData: {
    show: boolean;
    data: { qid: string; jtid: string };
  };
  tablePage: TPage;
  tableListTotal: number;
  sdictMap: TSdict[];
} = {
  tableList: [],
  tableListTotal: 0,
  tablePage: { page_no: 1, page_size: PAGE_SIZE },
  serchParams: {},
  modalData: { show: false, data: { qid: '', jtid: '' } },
  sdictMap: [],
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
        store.setState({ tablePage: { page_no: params, page_size: PAGE_SIZE } });
      },
      updateSdictMap(params: IState['sdictMap']) {
        params && store.setState({ sdictMap: [...params] });
      },
      /**
       * 获取列表
       *
       * @param {IState['serchParams']} [params]
       */
      getTableList(params?: IState['serchParams']) {
        console.log(params);
        params && store.updataSerchParams(params);
        const _params = params || store.state().serchParams;
        console.log("_params",_params);
        const { tablePage } = store.state();
        const { page_size, page_no } = tablePage;
        const offset = (page_no - 1) * page_size;
        serviceGetTableList({
          ..._params
        }).then((d) => {
          console.log(d);
          const { total = 0, quesjts = [] } = d;
          store.updateTableList(quesjts || []);
          store.updateTableListTotal(total || (quesjts || []).length);
        }).catch((err: any) => console.log(err));
      },
      /**
       * 设置裁判
       *
       * @param {{qid: string; uids: string; jtid: string}} params
       */
      postSetJudge(params: { qid: string; uids: string; jtid: string }) {
        servicePostSetJudge({ ...params }).then(() => {
          message.success('设置成功');
          store.updateModalData({ show: false, data: { qid: '', jtid: '' } });
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
      getSdic(params?: { sid: string}) {
        console.log('basic',basic.state());
        const { aid } = basic.state().userInfo;
        serviceGetSdict({ ...params, aid }).then((d: { sdata: any; }) => {
          const { sdata } = d;
          store.updateSdictMap(sdata);
        });
      },
    };
  },
};

export default { [NAME_SPACE]: model };
