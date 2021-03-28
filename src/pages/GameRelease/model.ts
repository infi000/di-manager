import { servicePostCreate, serviceGetTeam, serviceGetQuestion, servicePostTeamMember, servicePostCreateOrder } from './services';
import { NAME_SPACE } from './constants';
import { IPostParams, TContentType, IQuestionItem, IPostTeamMember, IOrderParams } from './type';
import { message } from 'antd';
const initParams = {
  tname: undefined,
  age: undefined,
  uid: undefined, // 用户id
  phone: undefined,
  school: undefined,
  sid: undefined, // 比赛id
  qid: undefined, // 题目id
  tename: undefined,// 英文名
  schoolename: undefined,
  province: undefined,
  city: undefined,
  email: undefined,
};

const state: {
  registerParams: Partial<IPostParams>;
  tableList: any[];
  contentType: TContentType;
  modalData: TModalData;
  questionList: Array<IQuestionItem>;
  createOrderInfo: Dictionary<any>;
} = {
  registerParams: { ...initParams },
  tableList: [],
  contentType: 'showTeam',
  modalData: { show: false, data: {} },
  questionList: [],
  createOrderInfo: {}
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
      updateContentType(params: TContentType) {
        store.setState({ contentType: params })
      },
      updatePostParams(params: IPostParams | null) {
        const registerParams = { ...params } || { ...initParams }
        store.setState({ registerParams })
      },
      updateModalData(params: TModalData) {
        store.setState({ modalData: { ...params } })
      },
      updateQuestionList(params: IQuestionItem[] | []){
        store.setState({ questionList: [...params] })
      },
      updateCreateOrderInfo(params: Dictionary<any>){
        store.setState({ createOrderInfo: {...params} })
      },
      postCreate(params: IPostParams) {
        const { registerParams } = store.state();
        servicePostCreate(registerParams).then(() => {
          message.success('提交成功');
          store.updateContentType('showTeam');
        }).catch((err: any) => console.log(err))
      },
      postTeamMember(params: IPostTeamMember) {
        servicePostTeamMember(params).then(() => {
          message.success('提交成功');
          store.updateModalData({ show: false, data: {} });
          store.getTeam();
        })
      },
      getTeam() {
        serviceGetTeam().then((d: any) => {
          d.teams && store.setState({ tableList: d.teams })
        }).catch((err: any) => console.log(err))
      },
      getQuestion() {
        serviceGetQuestion().then((d: any) => {
          d.questions && store.updateQuestionList(d.questions)
        }).catch((err: any) => console.log(err))
      },
      postCreateOrder(params: IOrderParams) {
        servicePostCreateOrder(params).then((d: any) => {
          message.success('提交成功');
          store.updateContentType('showPayInfo');
          store.updateCreateOrderInfo({});
        }).catch((err: any)=>{
          console.log(err);
        })
      }
    };
  },
};

export default { [NAME_SPACE]: model };
