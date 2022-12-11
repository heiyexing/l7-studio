import { LarkMap } from '@antv/larkmap';
import React, { ReactNode } from 'react';
import { useConfig } from '../../hooks';

export interface AppMapProps {
  children?: ReactNode;
}

export const AppMap: React.FC<AppMapProps> = ({ children }) => {
  const { mapOptions } = useConfig();

  return (
    <LarkMap {...mapOptions} style={{ height: '100%' }}>
      {children}
    </LarkMap>
  );
};
