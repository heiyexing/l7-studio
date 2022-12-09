import { LarkMap } from '@antv/larkmap';
import React, { ReactNode, useContext } from 'react';
import { ConfigContext } from '../../context/config-context';

export interface AppMapProps {
  children?: ReactNode;
}

export const AppMap: React.FC<AppMapProps> = ({ children }) => {
  const { mapOptions } = useContext(ConfigContext);

  return (
    <LarkMap {...mapOptions} style={{ height: '100%' }}>
      {children}
    </LarkMap>
  );
};
