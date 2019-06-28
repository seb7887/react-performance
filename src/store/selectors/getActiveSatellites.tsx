import { createSelector } from 'reselect';
import { ISatellite } from '../../types/Satellite';
import { ReduxState } from '../../types/ReduxState';

const getSatellites = (state: ReduxState): ISatellite[] =>
  state.satellites.satellites;

export const getActiveSatellites = createSelector(
  getSatellites,
  satellites => {
    return satellites.filter(satellite => satellite.isActive);
  }
);
