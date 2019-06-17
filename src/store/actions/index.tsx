import { createAction } from 'typesafe-actions';
import { ISatellite } from '../../types/Satellite';

const upsertSatellite = createAction('satellite/UPSERT_SATELLITE', resolve => {
  return (satellite: ISatellite) => resolve({ satellite });
});

const actions = {
  upsertSatellite
};

export default actions;
