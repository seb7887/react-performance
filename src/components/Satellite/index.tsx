import React from 'react';
import { ISatellite } from '../../types/Satellite';

interface IProps {
  satellite: ISatellite;
}

const Satellite: React.FC<IProps> = ({ satellite }) => (
  <div className="satellite">
    <div className="satellite-name">
      <img
        className="satellite__avatar"
        src={satellite.avatar}
        alt="satellite"
      />
      <p className="satellite__name">{satellite.name}</p>
    </div>
    <div className="satellite-info">
      <p className="satellite-info__location">{satellite.location}</p>
      <p className="satellit-info__updated">{satellite.lastUpdated}</p>
    </div>
  </div>
);

export default React.memo(Satellite);
