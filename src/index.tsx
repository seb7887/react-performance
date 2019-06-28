import React, { unstable_Profiler as Profiler } from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'redux-react-hook';
import { configureStore } from './store';
import { logProfiler } from './utils/logProfiler';
import './styles/main.scss';
import App from './App';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered ', registration);
      })
      .catch(err => {
        console.log('SW registration failed: ', err);
      });
  });
}

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Profiler id="App" onRender={logProfiler}>
      <App />
    </Profiler>
  </StoreContext.Provider>,
  document.getElementById('root')
);
