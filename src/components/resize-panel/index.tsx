// @ts-ignore
import { useSize } from 'ahooks';
import { Resizable } from 're-resizable';
import React, { ReactNode, useContext, useRef, useState } from 'react';
import { ConfigContext } from '../../context/config-context';
import './index.less';

export interface ResizePanelProps {
  left: ReactNode;
  right: ReactNode;
}

export const ResizePanel: React.FC<ResizePanelProps> = ({ left, right }) => {
  const { rightWidthRange } = useContext(ConfigContext);
  const resizePanel = useRef<HTMLDivElement>(null);
  const [rightWidth, setRightWidth] = useState(50);
  const [minRightWidth, maxRightWidth] = rightWidthRange;
  const { width: containerWidth = 0 } = useSize(resizePanel.current) ?? {};

  const onResize = (event: Event) => {
    const { left = 0 } = resizePanel.current?.getBoundingClientRect() ?? {};

    let rightWidth =
      100 * (1 - ((event as MouseEvent).clientX - left) / containerWidth);
    if (rightWidth < minRightWidth) {
      rightWidth = minRightWidth;
    }
    if (rightWidth > maxRightWidth) {
      rightWidth = maxRightWidth;
    }
    setRightWidth(rightWidth);
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
        minWidth={`${(minRightWidth / 100) * containerWidth}px`}
        maxWidth={`${(maxRightWidth / 100) * containerWidth}px`}
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
