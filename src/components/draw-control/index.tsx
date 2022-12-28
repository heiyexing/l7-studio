import { ControlEvent, DrawControl as L7DrawControl } from '@antv/l7-draw';
import { useScene } from '@antv/larkmap';
import React, { useCallback, useEffect, useState } from 'react';

export const DrawControl: React.FC = () => {
  const [drawControl, setDrawControl] = useState<L7DrawControl>();
  const scene = useScene();

  const onDrawCreate = useCallback(() => {}, []);

  useEffect(() => {
    drawControl?.on(ControlEvent.DataChange, (data) => {
      console.log(data);
    });
    return () => {};
  }, [drawControl, onDrawCreate]);

  useEffect(() => {
    // @ts-ignore
    const control = new L7DrawControl(scene, {
      drawConfig: {
        point: true,
        line: true,
        polygon: true,
        rect: true,
        circle: true,
        clear: false,
      },
      commonDrawOptions: {
        autoActive: false,
      },
    });
    setDrawControl(control);
    scene.addControl(control);

    return () => {
      scene.removeControl(control);
    };
  }, []);

  return <></>;
};
