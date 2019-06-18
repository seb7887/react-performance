import React from 'react';
import { ISatellite } from '../../types/Satellite';
import Satellite from '../Satellite';

interface IProps {
  satellites: ISatellite[];
}

const SatelliteList: React.FC<IProps> = ({ satellites }) => {
  return (
    <div className="grid">
      {satellites.map((satellite: ISatellite) => (
        <Satellite key={satellite.id} satellite={satellite} />
      ))}
    </div>
  );
};

export default SatelliteList;
