import classnames from 'classnames';
import React, { type FC } from 'react';
import { AppMap } from './components/app-map';
import { MapControlGroup } from './components/map-control-group';
import { ResizePanel } from './components/resize-panel';
import './styles/index.less';
import { L7StudioProps } from './types';

export const L7Studio: FC<L7StudioProps> = ({ className, style }) => {
  return (
    <div className={classnames(['l7-studio', className])} style={style}>
      <ResizePanel
        left={
          <AppMap>
            <MapControlGroup />
          </AppMap>
        }
        right={<div>123456</div>}
      />
    </div>
  );
};
