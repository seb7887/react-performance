import actions from '../store/actions';
import { randomSatelite } from './randomSatellites';

export const simulate = store => {
  setInterval(() => {
    store.dispatch(actions.upsertSatellite(randomSatelite()));
  });
};
