import {
  ExportImageControl,
  FullscreenControl,
  MapThemeControl,
  MouseLocationControl,
  ScaleControl,
  ZoomControl,
} from '@antv/larkmap';
import React from 'react';
import { downloadImage } from '../../utils';

export const MapControlGroup: React.FC = () => {
  return (
    <>
      <ZoomControl />
      <ScaleControl />
      <FullscreenControl />
      <ExportImageControl imageType="png" onExport={downloadImage} />
      <MouseLocationControl />
      <MapThemeControl />
      {/* TODO: 需要添加对应图层示例 */}
      {/*<LayerSwitchControl />*/}
    </>
  );
};
