import { LarkMap, LarkMapProps } from '@antv/larkmap';
import React, { ReactNode } from 'react';

export interface IAppMapProps {
  children?: ReactNode;
}
const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    style: 'light',
    center: [120.210792, 30.246026],
    zoom: 10,
  },
};
export const AppMap: React.FC<IAppMapProps> = ({ children }) => {
  return <LarkMap {...config}>{children}</LarkMap>;
};
