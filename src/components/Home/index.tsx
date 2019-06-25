import React, { useState, useEffect } from 'react';
import Banner from '../Banner';
import Spinner from '../Spinner';
import Content from '../Content';
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
      {!ready ? <Spinner /> : <Content satellites={satellites} />}
    </>
  );
};

export default Home;
