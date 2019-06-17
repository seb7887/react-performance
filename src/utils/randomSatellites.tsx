import Chance from 'chance';
import sat from '../images/sat.png';
import { ISatellite } from '../types/Satellite';

const chance = new Chance();

export const randomSatelite = (max: number): ISatellite => {
  const satellite: ISatellite = {
    isActive: chance.bool({ likelihood: 70 }),
    id: chance.integer({ min: 1, max }),
    location: `${chance.latitude()}, ${chance.longitude()}`,
    name: chance.word({ length: 4 }),
    avatar: sat,
    lastUpdated: new Date().toLocaleTimeString()
  };
  return satellite;
};

export const randomSatellites = (quantity: number = 50) => {
  const satellites: any = [];

  for (let i: number = 0; i < quantity; i++) {
    const satellite = randomSatelite(quantity);
    satellites[satellite.id] = satellite;
  }

  return satellites;
};
