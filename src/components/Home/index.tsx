import React, { useState, useEffect } from 'react';
import Banner from '../Banner';
import Spinner from '../Spinner';
import { ISatellite } from '../../types/Satellite';

interface IProps {
  satellites: ISatellite[];
}

const Satellites = React.lazy(() =>
  import(/* webpackChunkName: "Satellites" */ '../Content')
);

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
        <React.Suspense fallback={<Spinner />}>
          <Satellites satellites={satellites} />
        </React.Suspense>
      )}
    </>
  );
};

export default Home;
