import {
  feature,
  FeatureCollection,
  featureCollection,
  lineString,
  point,
  polygon,
} from '@turf/turf';
import { chunk, first, isEqual, last } from 'lodash';
import {
  FeatureCollectionVT,
  FeatureListVT,
  FeatureVT,
  GeometryListVT,
  GeometryVT,
  LngLatVT,
} from '../constants';
import { TransformLngLatType } from '../types';

export const transformGeoJson: (input: string) => FeatureCollection = (
  input,
) => {
  const json = JSON.parse(input) as any;
  if (FeatureCollectionVT.check(json)) {
    return json;
  }
  if (Array.isArray(json)) {
    if (FeatureListVT.check(json)) {
      return featureCollection(json);
    }
    if (GeometryListVT.check(json)) {
      return featureCollection(json.map((item) => feature(item)));
    }
    console.warn('未识别 JSON 数组类型');
    return featureCollection([]);
  }
  if (FeatureVT.check(json)) {
    return featureCollection([json]);
  }
  if (GeometryVT.check(json)) {
    return featureCollection([feature(json)]);
  }
};

export const transformLngLat = (
  input: string,
  transformLngLatType: TransformLngLatType,
) => {
  const positionList = chunk(
    input.split(/[^\d.-]+/).map((item) => +item),
    2,
  );
  if (LngLatVT.check(positionList)) {
    if (transformLngLatType === 'Point' || positionList.length === 1) {
      return featureCollection(positionList.map((position) => point(position)));
    }
    if (
      transformLngLatType === 'Polygon' &&
      !isEqual(first(positionList), last(positionList)) &&
      positionList.length >= 3
    ) {
      positionList.push(positionList[0]);
    }
    if (
      transformLngLatType !== 'LineString' &&
      isEqual(first(positionList), last(positionList)) &&
      positionList.length >= 4
    ) {
      return featureCollection([polygon([positionList])]);
    }
    return featureCollection([lineString(positionList)]);
  }
  return featureCollection([]);
};
