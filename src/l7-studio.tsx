import { FeatureCollection, featureCollection } from '@turf/turf';
import 'antd/dist/antd.less';
import classnames from 'classnames';
import React, { useState, type FC } from 'react';
import {
  AppMap,
  LayerColorControl,
  LayerList,
  MapContent,
  MapControlGroup,
  ResizePanel,
} from './components';
import { useConfig } from './hooks';
import './styles/index.less';
import { L7StudioProps } from './types';

export const L7Studio: FC<L7StudioProps> = ({ className, style }) => {
  const { defaultLayerColor } = useConfig();
  const [fc, setFc] = useState<FeatureCollection>(featureCollection([]));
  const [layerColor, setLayerColor] = useState(defaultLayerColor);

  return (
    <div className={classnames(['l7-studio', className])} style={style}>
      <ResizePanel
        left={
          <AppMap>
            <MapControlGroup />
            <LayerList fc={fc} layerColor={layerColor} />
            <LayerColorControl
              layerColor={layerColor}
              setLayerColor={setLayerColor}
            />
          </AppMap>
        }
        right={<MapContent fc={fc} setFc={setFc} />}
      />
    </div>
  );
};
