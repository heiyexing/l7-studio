import { LarkMapProps } from '@antv/larkmap';
import { CSSProperties } from 'react';

export type InputType = 'GeoJson' | 'LngLat';

export type TransformLngLatType =
  | 'Default'
  | 'Point'
  | 'LineString'
  | 'Polygon';

export interface L7StudioProps {
  className?: string;
  style?: CSSProperties;
  rightWidthRange: [number, number];
  mapOptions: LarkMapProps;
  inputType: InputType;
  defaultLayerColor: string;
}
