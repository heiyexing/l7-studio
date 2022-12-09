import { LarkMapProps } from '@antv/larkmap';
import { CSSProperties } from 'react';

export interface L7StudioProps {
  className?: string;
  style?: CSSProperties;
  rightWidthRange: [number, number];

  mapOptions: LarkMapProps;
}
