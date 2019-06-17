import React from 'react';
import Banner from '../Banner';
<<<<<<< HEAD

const Home: React.FC = () => (
  <>
    <Banner>AstroPics</Banner>
    <h1>Hello Typescript!</h1>
=======
import Panel from '../Panel';
import SatelliteList from '../SatelliteList';

const Home: React.FC = () => (
  <>
    <Banner>Ad Astra</Banner>
    <div className="content">
      <Panel quantity={2} />
      <SatelliteList />
    </div>
>>>>>>> 7103f92545116b5c7e051e5943d4697db864b8bc
  </>
);

export default Home;
