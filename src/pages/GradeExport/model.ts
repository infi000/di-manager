import { message } from 'antd';
import { serviceGetTableList, serviceGetSdict, serviceGetdict } from './services';
import { NAME_SPACE } from './constants';
import { ISearch, IState, ITableItem, TSdict, TDictA, TDictQ } from './type';

const state: {
  tableList: ITableItem[];
  serchParams: ISearch;
  modalData: TModalData<ITableItem | {}>;
  tablePage: TPage;
  tableListTotal: number;
  sdictMap: TSdict[];
  dictQMap: TDictQ[];
  dictAMap: TDictA[];
} = {
  tableList: [],
  tableListTotal: 0,
  tablePage: { page_no: 1, page_size: 10000 },
  serchParams: {},
  modalData: { show: false, data: {} },
  sdictMap: [],
  dictQMap: [],
  dictAMap: []
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
        store.setState({ tablePage: { page_no: params, page_size: 10000 } });
      },
      updateSdictMap(params: IState['sdictMap']) {
        params && store.setState({ sdictMap: [...params] });
      },
      updatedictQMap(params: IState['dictQMap']) {
        params && store.setState({ dictQMap: [...params] });
      },
      updatedictAMap(params: IState['dictAMap']) {
        params && store.setState({ dictAMap: [...params] });
      },
      getTableList(params?: ISearch) {
        params && store.updataSerchParams(params);
        const _params = params || store.state().serchParams;
        // const { tablePage } = store.state();
        // const { page_size, page_no } = tablePage;
        // const offset = (page_no - 1) * page_size;
        serviceGetTableList({ ..._params }).then((d: any) => {
          const { total, jds = [] } = d;
          store.updateTableList(jds || []);
          store.updateTableListTotal(total || jds.length);
        }).catch((err: any) => console.log(err));
      },
      getSdic(params?: { sid: string}) {
        serviceGetSdict(params).then((d: { sdata: any; }) => {
          const { sdata } = d;
          store.updateSdictMap(sdata);
        });
      },
      getDic(params: { sid: string}) {
        serviceGetdict(params).then((d: { qdata: any; adata: any; }) => {
          const { qdata, adata } = d;
          store.updatedictQMap(qdata);
          store.updatedictAMap(adata);
        });
      },
    };
  },
};

export default { [NAME_SPACE]: model };
