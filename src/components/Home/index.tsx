import React from 'react';
import Banner from '../Banner';
import Panel from '../Panel';
import SatelliteList from '../SatelliteList';

const Home: React.FC = () => (
  <>
    <Banner>Ad Astra</Banner>
    <div className="content">
      <Panel quantity={2} />
      <SatelliteList />
    </div>
  </>
);

export default Home;
