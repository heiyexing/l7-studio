import { L7StudioProps } from '../types';

export const DefaultL7StudioConfig: L7StudioProps = {
  rightWidthRange: [20, 80],
  mapOptions: {
    mapType: 'GaodeV2',
    mapOptions: {
      style: 'normal',
      center: [120.210792, 30.246026],
      zoom: 10,
      WebGLParams: {
        preserveDrawingBuffer: true,
      },
    },
  },
  inputType: 'GeoJson',
  defaultLayerColor: '#1677ff',
};

export * from './variable-type';

export const dingdingGroupImg =
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*d7TMQpSiofwAAAAAAAAAAAAADmJ7AQ/original';

export const DrawIdKeyName = '__draw_id';
export const DrawTypeKeyName = '__draw_type';
