import { produce } from 'immer';
import { getType } from 'typesafe-actions';
import { ReduxAction } from '../../types/ReduxAction';
import { ISatellite } from '../../types/Satellite';
import { randomSatellites } from '../../utils/randomSatellites';
import actions from '../actions';

export interface IState {
  satellites: ISatellite[];
}

export const initialState: IState = {
  satellites: randomSatellites()
};

export const satelliteReducer = (
  state: IState = initialState,
  action: ReduxAction
): IState => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.upsertSatellite): {
        const satellite = action.payload.satellite;
        draft.satellites = { ...state.satellites, [satellite.id]: satellite };
        break;
      }
      default:
        return state;
    }
  });
};
