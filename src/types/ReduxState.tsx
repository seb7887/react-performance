import { StateType } from 'typesafe-actions';
import { rootReducer } from '../store/reducers';

export type ReduxState = StateType<typeof rootReducer>;
