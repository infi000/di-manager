import { get } from 'lodash';

type TFile = { ossUlr: string }[];
export const formatPostFile:any = (data: { guide: TFile; challenge: TFile; trainbook: TFile } & Dictionary<any>) => {
  const guide = get(data, ['guide', 0, 'ossUlr'], '');
  const challenge = get(data, ['challenge', 0, 'ossUlr'], '');
  const trainbook = get(data, ['trainbook', 0, 'ossUlr'], '');
  return {
    ...data,
    guide,
    challenge,
    trainbook
  };
};
export default {};
