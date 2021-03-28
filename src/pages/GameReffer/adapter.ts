import moment from 'moment'
import { ICreateParams } from './type';;

export const formatCreateParams:any = (val: ICreateParams["data"]) => {
  const { jts, ...rest } = { ...val };
  return {
    data: {
      ...rest,
      jts
    }
  }
};


// export const formatItem = (val: ITableItem | {}) => {
//   // const { starttime, endtime, regstarttime, regendtime, commitendtime, commitstarttime, evaluationendtime, evaluationstarttime, resulttime, ...rest } = { ...val };
//   // return {
//   //   ...rest,
//   //   starttime: starttime ? moment(starttime, DATE_FORMAT): '',
//   //   endtime: endtime ? moment(endtime, DATE_FORMAT) : '',
//   //   regstarttime: regstarttime ? moment(regstarttime, DATE_FORMAT) : '',
//   //   regendtime: regendtime ? moment(regendtime, DATE_FORMAT) : '',
//   //   commitendtime: commitendtime ? moment(commitendtime, DATE_FORMAT) : '',
//   //   commitstarttime: commitstarttime ? moment(commitstarttime, DATE_FORMAT) : '',
//   //   evaluationendtime: evaluationendtime ? moment(evaluationendtime, DATE_FORMAT) : '',
//   //   evaluationstarttime: evaluationstarttime ? moment(evaluationstarttime, DATE_FORMAT) : '',
//   //   resulttime: resulttime ? moment(resulttime, DATE_FORMAT) : '',
//   // }
// };

export default {}
