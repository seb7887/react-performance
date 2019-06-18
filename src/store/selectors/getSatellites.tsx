import { ISatellite } from '../../types/Satellite';
import { ReduxState } from '../../types/ReduxState';

export const getSatellites = (state: ReduxState): ISatellite[] => {
  const { satellites } = state.satellites;
  const activeSatellites: ISatellite[] = satellites.filter(
    satellite => satellite.isActive
  );
  return activeSatellites;
};
