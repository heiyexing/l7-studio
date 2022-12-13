import { DrawControl as L7DrawControl, DrawEvent } from '@antv/l7-draw';
import { useScene } from '@antv/larkmap';
import React, { useCallback, useEffect, useState } from 'react';

export const DrawControl: React.FC = () => {
  const [drawControl, setDrawControl] = useState<L7DrawControl>();
  const scene = useScene();

  const onDrawCreate = useCallback(() => {}, []);

  useEffect(() => {
    drawControl?.on(DrawEvent.Add, () => {});
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
    });
    setDrawControl(control);
    scene.addControl(control);

    return () => {
      scene.removeControl(control);
    };
  }, []);

  return <></>;
};
