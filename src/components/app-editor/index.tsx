import { useSize } from 'ahooks';
import React, { useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { InputType } from '../../types';
import './index.less';

export interface AppEditorProps {
  value: string;
  onChange: (value: string) => void;
  inputType: InputType;
}

export const AppEditor: React.FC<AppEditorProps> = ({
  value,
  onChange,
  inputType,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { width = 0, height = 0 } = useSize(editorRef.current) ?? {};

  return (
    <div ref={editorRef} className="l7-studio__app-studio">
      <MonacoEditor
        width={width}
        height={height}
        language={inputType === 'GeoJson' ? 'json' : 'text'}
        value={value}
        onChange={onChange}
        options={{
          selectOnLineNumbers: true,
          tabIndex: 2,
          tabSize: 2,
          folding: true,
          foldingStrategy: 'indentation',
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};
