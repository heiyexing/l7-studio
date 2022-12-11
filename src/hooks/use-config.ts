import { useContext } from 'react';
import { ConfigContext } from '../context/config-context';

export const useConfig = () => {
  return useContext(ConfigContext);
};
