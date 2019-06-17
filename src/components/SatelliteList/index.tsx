import React from 'react';
import { ISatellite } from '../../types/Satellite';
import { randomSatellites } from '../../utils/randomSatellites';
import Satellite from '../Satellite';

const SatelliteList = () => {
  const satellites: ISatellite[] = randomSatellites(2);

  return (
    <div className="grid">
      {satellites.map((satellite: ISatellite) => (
        <Satellite key={satellite.id} satellite={satellite} />
      ))}
    </div>
  );
};

export default SatelliteList;
