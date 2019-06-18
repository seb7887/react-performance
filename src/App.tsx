import React, { useEffect } from 'react';
import { ReduxState } from './types/ReduxState';
import actions from './store/actions';
import { randomSatellites } from './utils/randomSatellites';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { getSatellites } from './store/selectors';
import Home from './components/Home';

const mapState = (state: ReduxState) => ({
  satellites: getSatellites(state)
});

const App: React.FC = () => {
  const { satellites } = useMappedState(mapState);

  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(actions.upsertSatellite(randomSatellites()));
    }, 3000);
  }, []);

  return <Home satellites={satellites} />;
};

export default App;
