import { serviceGetTableList, servicePostPayType, servicePostSetCode, serviceGetInvoiceDetail } from './services';
import { NAME_SPACE } from './constants';
import { ISearch, IState, ITableItem, IVerifypay, ISetcode } from './type';
import { message } from 'antd';

const state: {
  tableList: ITableItem[];
  serchParams: ISearch;
  modalData: TModalData<string | {}>;
  modalDataPayTYpe: TModalData<string>;
  modalDataInvoice: TModalData<Dictionary<any>>;
  tablePage: TPage;
  tableListTotal: number;
} = {
  tableList: [],
  tableListTotal: 0,
  tablePage: { page_no: 1, page_size: 20 },
  serchParams: {},
  modalData: { show: false, data: {} },
  modalDataPayTYpe: { show: false, data: '' },
  modalDataInvoice: { show: false, data: {} },
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
      updateModalDataType(params: IState['modalDataPayTYpe']) {
        params && store.setState({ modalDataPayTYpe: { ...params } });
      },
      updateModalDataInvoice(params: IState['modalDataInvoice']) {
        params && store.setState({ modalDataInvoice: { ...params } });
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
      getTableList(params?: ISearch) {
        params && store.updataSerchParams(params);
        const _params = params || store.serchParams;
        const { tablePage } = store.state();
        const { page_size, page_no } = tablePage;
        const offset = (page_no - 1) * page_size;
        serviceGetTableList({ ..._params, offset, count: page_size }).then((d: any) => {
          const { total = 0, teams = [] } = d;
          store.updateTableList(teams || []);
          store.updateTableListTotal(total);
        }).catch((err: any) => console.log(err));
      },
      getInvoiceDetail(params: { tid: string }) {
        serviceGetInvoiceDetail(params).then((d) => {
          store.updateModalDataInvoice({ data: d || {}, show: true });
        });
      },
      postPayType(params: IVerifypay) {
        servicePostPayType({ ...params }).then((d: any) => {
          store.getTableList();
          store.updateModalDataType({ data: '', show: false });
        }).catch((err: any) => console.log(err));
      },
      postSetCode(params: ISetcode) {
        servicePostSetCode({ ...params }).then((d: any) => {
          store.getTableList();
          store.updateModalData({ data: '', show: false });
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
