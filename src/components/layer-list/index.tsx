import { LineLayer, PointLayer, PolygonLayer } from '@antv/larkmap';
import { Feature, featureCollection, FeatureCollection } from '@turf/turf';
import { getOpacityColor } from 'l7-studio/utils';
import { groupBy } from 'lodash';
import React, { useMemo } from 'react';

export interface LayerListProps {
  fc: FeatureCollection;
  layerColor: string;
}

export const LayerList: React.FC<LayerListProps> = ({ fc, layerColor }) => {
  const { pointFC, lineFC, polygonFC } = useMemo(() => {
    const {
      Polygon: polygonList = [],
      LineString: lineStringList = [],
      Point: pointList = [],
    }: Record<string, Feature[]> = groupBy(fc.features, (feature: Feature) =>
      feature.geometry.type.replace('Multi', ''),
    );
    return {
      polygonFC: featureCollection(polygonList),
      lineFC: featureCollection(lineStringList),
      pointFC: featureCollection(pointList),
    };
  }, [fc]);

  return (
    <>
      <PolygonLayer
        autoFit
        source={{ data: polygonFC }}
        shape="fill"
        color={getOpacityColor(layerColor, 0.5)}
      />
      <PolygonLayer
        source={{ data: polygonFC }}
        shape="line"
        color={layerColor}
        size={2}
      />
      <LineLayer
        autoFit
        source={{ data: lineFC }}
        color={layerColor}
        size={2}
      />
      <PointLayer
        autoFit
        source={{ data: pointFC }}
        color="#fff"
        size={8}
        shape="circle"
        style={{
          stroke: layerColor,
          strokeWidth: 4,
        }}
      />
    </>
  );
};
