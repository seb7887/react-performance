import { ActionType } from 'typesafe-actions';
import actions from '../store/actions';

export type ReduxAction = ActionType<typeof actions>;
