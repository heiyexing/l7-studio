import {
  FullscreenControl,
  MapThemeControl,
  MouseLocationControl,
  ScaleControl,
  ZoomControl,
} from '@antv/larkmap';
import React, { ReactNode } from 'react';

export interface MapControlGroupProps {
  children: ReactNode;
}

export const MapControlGroup: React.FC<MapControlGroupProps> = ({
  children,
}) => {
  return (
    <>
      <ZoomControl />
      <ScaleControl />
      <FullscreenControl />
      {/*<ExportImageControl imageType="png" onExport={downloadImage} />*/}
      <MouseLocationControl />
      <MapThemeControl />
      {children}
      {/* TODO: 需要添加对应图层示例 */}
      {/*<LayerSwitchControl />*/}
    </>
  );
};
