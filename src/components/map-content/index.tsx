import {
  AppstoreOutlined,
  CloudDownloadOutlined,
  DingdingOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { featureCollection, FeatureCollection } from '@turf/turf';
import { useKeyPress, useUpdateEffect } from 'ahooks';
import { Button, Dropdown, MenuProps, Popover, Tooltip } from 'antd';
import {
  downloadText,
  transformGeoJson,
  transformLngLat,
} from 'l7-studio/utils';
import React, { useMemo, useState } from 'react';
import { AppEditor } from '../../components';
import { dingdingGroupImg } from '../../constants';
import { useConfig } from '../../hooks';
import { InputType, TransformLngLatType } from '../../types';
import './index.less';

const InputTypeMenuItems: MenuProps['items'] = [
  {
    key: 'GeoJson',
    label: 'GeoJson',
  },
  {
    key: 'LngLat',
    label: 'LngLat',
  },
];

const TransformLngLatTypeItems: MenuProps['items'] = [
  {
    key: 'Default',
    label: '默认',
  },
  {
    key: 'Point',
    label: '点',
  },
  {
    key: 'LineString',
    label: '线',
  },
  {
    key: 'Polygon',
    label: '面',
  },
];

const DownloadMenuItems: MenuProps['items'] = [
  {
    key: 'Origin',
    label: '下载当前输入数据',
  },
  {
    key: 'GeoJson',
    label: '下载 GeoJson 格式数据',
  },
];

export interface MapContentProps {
  fc: FeatureCollection;
  setFc: (fc: FeatureCollection) => void;
}

export const MapContent: React.FC<MapContentProps> = ({ fc, setFc }) => {
  const { inputType: defaultInputType } = useConfig();
  const [inputType, setInputType] = useState<InputType>(defaultInputType);
  const [transformLngLatType, setTransformLngLatType] =
    useState<TransformLngLatType>('Default');
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');

  const savable = useMemo(() => text !== savedText, [savedText, text]);

  const doSave = () => {
    try {
      if (inputType === 'GeoJson') {
        setFc(transformGeoJson(text));
      } else {
        setFc(transformLngLat(text, transformLngLatType));
      }
      setSavedText(text);
    } catch (e) {
      console.error(e);
    }
  };

  const onSave = () => {
    if (!text) {
      setFc(featureCollection([]));
      return;
    }
    doSave();
  };

  useUpdateEffect(() => {
    doSave();
  }, [transformLngLatType]);

  useKeyPress('ctrl.s', (e) => {
    e.preventDefault();
    if (!savable) {
      return;
    }
    onSave();
  });

  return (
    <div className="l7-studio____map-content">
      <div className="l7-studio____map-content__left">
        <div>
          <Dropdown
            trigger={['click']}
            menu={{
              items: InputTypeMenuItems,
              selectedKeys: [inputType],
              onClick: (e) => {
                setInputType(e.key as InputType);
                setText('');
              },
            }}
          >
            <Tooltip trigger="hover" placement="left" overlay="输入方式">
              <Button icon={inputType === 'GeoJson' ? 'G' : 'L'}></Button>
            </Tooltip>
          </Dropdown>

          {inputType === 'LngLat' && (
            <Dropdown
              trigger={['click']}
              menu={{
                items: TransformLngLatTypeItems,
                selectedKeys: [transformLngLatType],
                onClick: (e) => {
                  setTransformLngLatType(e.key as TransformLngLatType);
                },
              }}
            >
              <Tooltip
                trigger="hover"
                placement="left"
                overlay="LngLat 解析方式"
              >
                <Button icon={<AppstoreOutlined />}></Button>
              </Tooltip>
            </Dropdown>
          )}

          <Tooltip
            trigger="hover"
            placement="left"
            overlay="保存（Ctrl/Command + S）"
          >
            <Button
              icon={<SaveOutlined />}
              disabled={!savable}
              onClick={onSave}
            ></Button>
          </Tooltip>
        </div>

        <div>
          <Dropdown
            menu={{
              items: DownloadMenuItems,
              onClick: (e) => {
                if (e.key === 'Origin') {
                  downloadText(text, inputType === 'LngLat' ? 'json' : 'txt');
                } else {
                  downloadText(JSON.stringify(fc, null, 2), 'json');
                }
              },
            }}
            trigger={['click']}
          >
            <Button icon={<CloudDownloadOutlined />}></Button>
          </Dropdown>
          <Popover
            overlayStyle={{ padding: 0 }}
            content={<img style={{ width: 400 }} src={dingdingGroupImg} />}
          >
            <Button icon={<DingdingOutlined />}></Button>
          </Popover>
        </div>
      </div>
      <div className="l7-studio____map-content__right">
        <AppEditor inputType={inputType} value={text} onChange={setText} />
      </div>
    </div>
  );
};
