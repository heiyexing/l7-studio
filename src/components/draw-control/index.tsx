import { DrawControl as L7DrawControl, DrawEvent } from '@antv/l7-draw';
import { useScene } from '@antv/larkmap';
import { Feature, featureCollection, FeatureCollection } from '@turf/turf';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DrawIdKeyName } from '../../constants';

interface IProps {
  setFc: Dispatch<SetStateAction<FeatureCollection>>;
}

export const DrawControl: React.FC<IProps> = ({ setFc }) => {
  const [drawControl, setDrawControl] = useState<L7DrawControl>();
  const scene = useScene();
  const drawList = useMemo(
    () => [
      drawControl?.getTypeDraw('point'),
      drawControl?.getTypeDraw('line'),
      drawControl?.getTypeDraw('polygon'),
      drawControl?.getTypeDraw('rect'),
      drawControl?.getTypeDraw('circle'),
    ],
    [drawControl],
  );

  useEffect(() => {
    drawList.forEach((draw) => {
      draw?.on(DrawEvent.Add, (newFeature: Feature) => {
        draw?.clear();
        setFc((oldFeatureCollection) => {
          newFeature.properties = {
            [DrawIdKeyName]: Date.now(),
          };
          return featureCollection([
            ...oldFeatureCollection.features,
            newFeature,
          ]);
        });
      });
    });
  }, [drawControl]);

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
        editable: false,
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
