import { UTYPE_MAP } from '@/constants';

export const NAME_SPACE = 'register';

export const UTYPE_OPTION = Array.from(UTYPE_MAP).map(item => {
  const [label, value] = item;
  return { label, value };
})

export default {};