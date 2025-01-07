import React from 'react';
import { Card as AntCard } from 'antd';

const Card: React.FC<{ children: React.ReactNode; style?: string }> = ({ children, style }) => {
  return <AntCard className={`${style}`}>{children}</AntCard>;
};

export default Card;
