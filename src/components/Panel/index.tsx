import React from 'react';
import sat from '../../images/icon.png';

interface IProps {
  quantity: number;
}

const Panel: React.FC<IProps> = ({ quantity }) => (
  <div className="panel">
    <img className="panel__img" src={sat} alt="satellite" />
    <p className="panel__p">Scanning active satellites ({quantity})</p>
  </div>
);

export default Panel;
