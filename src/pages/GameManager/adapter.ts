import moment from 'moment'
import { ICreateParams, ITableItem } from './type';;
import { DATE_FORMAT } from './constants';

export const formatCreateParams = (val: ICreateParams) => {
  const { starttime, endtime, regstarttime, regendtime, commitendtime, commitstarttime, evaluationendtime, evaluationstarttime, resulttime, thumbinal,...rest } = { ...val };
  return {
    ...rest,
    starttime: starttime ? moment(starttime).format(DATE_FORMAT) : '',
    endtime: endtime ? moment(endtime).format(DATE_FORMAT) : '',
    regstarttime: regstarttime ? moment(regstarttime).format(DATE_FORMAT) : '',
    regendtime: regendtime ? moment(regendtime).format(DATE_FORMAT) : '',
    commitendtime: commitendtime ? moment(commitendtime).format(DATE_FORMAT) : '',
    commitstarttime: commitstarttime ? moment(commitstarttime).format(DATE_FORMAT) : '',
    evaluationendtime: evaluationendtime ? moment(evaluationendtime).format(DATE_FORMAT) : '',
    evaluationstarttime: evaluationstarttime ? moment(evaluationstarttime).format(DATE_FORMAT) : '',
    resulttime: resulttime ? moment(resulttime).format(DATE_FORMAT) : '',
    thumbinal: Array.isArray(thumbinal)? thumbinal.join(','):'',
  }
};


export const formatItem = (val: ITableItem | {}) => {
  const { starttime, endtime, regstarttime, regendtime, commitendtime, commitstarttime, evaluationendtime, evaluationstarttime, resulttime, thumbinal,...rest } = { ...val };
  return {
    ...rest,
    starttime: starttime ? moment(starttime, DATE_FORMAT): '',
    endtime: endtime ? moment(endtime, DATE_FORMAT) : '',
    regstarttime: regstarttime ? moment(regstarttime, DATE_FORMAT) : '',
    regendtime: regendtime ? moment(regendtime, DATE_FORMAT) : '',
    commitendtime: commitendtime ? moment(commitendtime, DATE_FORMAT) : '',
    commitstarttime: commitstarttime ? moment(commitstarttime, DATE_FORMAT) : '',
    evaluationendtime: evaluationendtime ? moment(evaluationendtime, DATE_FORMAT) : '',
    evaluationstarttime: evaluationstarttime ? moment(evaluationstarttime, DATE_FORMAT) : '',
    resulttime: resulttime ? moment(resulttime, DATE_FORMAT) : '',
    thumbinal: thumbinal?[thumbinal]:[]
  }
};

export default {}
