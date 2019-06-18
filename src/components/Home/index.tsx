import React from 'react';
import Banner from '../Banner';
import Panel from '../Panel';
import SatelliteList from '../SatelliteList';
import { ISatellite } from '../../types/Satellite';

interface IProps {
  satellites: ISatellite[];
}

const Home: React.FC<IProps> = ({ satellites }) => (
  <>
    <Banner>Ad Astra</Banner>
    <div className="content">
      <Panel quantity={satellites.length} />
      <SatelliteList satellites={satellites} />
    </div>
  </>
);

export default Home;
