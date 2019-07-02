import React, { useState, useEffect } from 'react';
import Worker from 'worker-loader!./worker';
import { ISatellite } from '../../types/Satellite';
import Satellite from '../Satellite';

interface IProps {
  satellites: ISatellite[];
}

const SatelliteList: React.FC<IProps> = ({ satellites }) => {
  const [activeSatellites, setSatellites] = useState(satellites);

  useEffect(() => {
    const worker = new Worker();
    worker.onmessage = (ev: MessageEvent) => {
      setSatellites(ev.data);
      worker.terminate();
    };
    worker.postMessage(satellites);
  }, [satellites]);

  return (
    <div className="grid">
      {activeSatellites.map((satellite: ISatellite) => (
        <Satellite key={satellite.id} satellite={satellite} />
      ))}
    </div>
  );
};

export default SatelliteList;
