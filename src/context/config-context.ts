import { createContext } from 'react';
import { DefaultL7StudioConfig } from '../constants';
import { L7StudioProps } from '../types';

export const ConfigContext = createContext<L7StudioProps>(
  DefaultL7StudioConfig,
);

export const ConfigProvider = ConfigContext.Provider;
