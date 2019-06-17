import { combineReducers } from 'redux';
import { satelliteReducer } from './satelliteReducer';

export const rootReducer = combineReducers({
  satellites: satelliteReducer
});
