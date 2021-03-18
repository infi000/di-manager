import {model} from './model';

export interface IPostParams  { mname: string; pass: string | number }

export type TAction = ReturnType<typeof model.actions>

export type IState = typeof model.state;
export default {}