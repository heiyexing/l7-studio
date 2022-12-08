// @ts-ignore
import { Resizable } from 're-resizable';
import React, { ReactNode, useContext, useRef, useState } from 'react';
import { ConfigContext } from '../../context/config-context';
import './index.less';

export interface IResizePanelProps {
  left: ReactNode;
  right: ReactNode;
}

export const ResizePanel: React.FC<IResizePanelProps> = ({ left, right }) => {
  const { rightWidthRange } = useContext(ConfigContext);
  const resizePanel = useRef<HTMLDivElement>(null);
  const [rightWidth, setRightWidth] = useState(50);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [minRightWidth, maxRightWidth] = rightWidthRange;

  const onResize = (event: Event) => {
    const {
      width = 0,
      left = 0,
      height = 0,
    } = resizePanel.current?.getBoundingClientRect() ?? {};

    let rightWidth = 100 * (1 - ((event as MouseEvent).clientX - left) / width);
    if (rightWidth < minRightWidth) {
      rightWidth = minRightWidth;
    }
    if (rightWidth > maxRightWidth) {
      rightWidth = maxRightWidth;
    }
    setRightWidth(rightWidth);
    setContainerSize({
      width,
      height,
    });
  };

  return (
    <div className="resize-panel" ref={resizePanel}>
      <div
        className="resize-panel-left"
        style={{ width: `calc(100% - ${rightWidth}%)` }}
      >
        {left}
      </div>
      <Resizable
        enable={{
          left: true,
        }}
        style={{
          marginLeft: `${100 - rightWidth}%`,
        }}
        size={{
          width: `${rightWidth}%`,
          height: '100%',
        }}
        minWidth={`${(minRightWidth / 100) * containerSize.width}px`}
        maxWidth={`${(maxRightWidth / 100) * containerSize.width}px`}
        className="resize-panel-right"
        handleClasses={{
          left: 'resize-panel-drag-line',
        }}
        handleStyles={{
          left: { width: 6, left: -3 },
        }}
        defaultSize={{
          width: `${rightWidth}%`,
          height: '100%',
        }}
        onResize={onResize}
      >
        {right}
      </Resizable>
    </div>
  );
};
