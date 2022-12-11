import { CustomControl } from '@antv/larkmap';
import { Popover } from 'antd';
import React from 'react';
import { SketchPicker } from 'react-color';
import './index.less';

export interface LayerColorControlProps {
  layerColor: string;
  setLayerColor: (layerColor: string) => void;
}

export const LayerColorControl: React.FC<LayerColorControlProps> = ({
  layerColor,
  setLayerColor,
}) => {
  return (
    <CustomControl className="l7-button-control" position="topright">
      <Popover
        trigger="click"
        overlayClassName="l7-studio__color-picker-control__tooltip"
        placement="bottomRight"
        content={
          <SketchPicker
            color={layerColor}
            onChange={({ rgb }) => {
              const { r, g, b, a } = rgb;
              setLayerColor(`rgba(${[r, g, b, a].join(', ')})`);
            }}
          />
        }
      >
        <div
          className="l7-studio__color-picker-control__inner"
          style={{ backgroundColor: layerColor }}
        ></div>
      </Popover>
    </CustomControl>
  );
};
