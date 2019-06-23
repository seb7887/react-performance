import React from 'react';
import { ISatellite } from '../../types/Satellite';
import Panel from '../Panel';
import SatelliteList from '../SatelliteList';

interface IProps {
  satellites: ISatellite[];
}

const Content: React.FC<IProps> = ({ satellites }) => (
  <div className="content">
    <Panel quantity={satellites.length} />
    <SatelliteList satellites={satellites} />
  </div>
);

export default Content;
