import {
  ExportImageControl,
  FullscreenControl,
  MapThemeControl,
  MouseLocationControl,
  ScaleControl,
  ZoomControl,
} from '@antv/larkmap';
import React from 'react';

export const MapControlGroup: React.FC = () => {
  return (
    <>
      <ZoomControl />
      <ScaleControl />
      <FullscreenControl />
      <ExportImageControl />
      <MouseLocationControl />
      <MapThemeControl />
      {/* TODO: 需要添加对应图层示例 */}
      {/*<LayerSwitchControl />*/}
    </>
  );
};
