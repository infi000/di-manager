import {model} from './model';

export interface IPostParams extends IUserInfo {}

export type TAction = ReturnType<typeof model.actions>

export type IState = typeof model.state;