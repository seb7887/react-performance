import React, { useState, useEffect } from 'react';
import Banner from '../Banner';
import Spinner from '../Spinner';
import Panel from '../Panel';
import SatelliteList from '../SatelliteList';
import { ISatellite } from '../../types/Satellite';

interface IProps {
  satellites: ISatellite[];
}

const Home: React.FC<IProps> = ({ satellites }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), 2500);
  });

  return (
    <>
      <Banner>Ad Astra</Banner>
      {!ready ? (
        <Spinner />
      ) : (
        <div className="content">
          <Panel quantity={satellites.length} />
          <SatelliteList satellites={satellites} />
        </div>
      )}
    </>
  );
};

export default Home;
