import { javascript } from '@codemirror/lang-javascript';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  darkMode: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  readOnly = false,
  darkMode,
}) => {
  return (
    <CodeMirror
      value={value}
      height="400px"
      theme={darkMode ? githubDark : githubLight}
      extensions={[javascript()]}
      onChange={onChange}
      readOnly={readOnly}
      className="border border-gray-200 rounded-lg overflow-hidden"
    />
  );
};