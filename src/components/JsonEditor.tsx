import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const JsonEditor = ({ onChange }: { onChange: (json: string) => void }) => {
  const [json, setJson] = useState('{}');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJson(value);
    onChange(value);
  };

  return (
    <div>
      <textarea
        value={json}
        onChange={handleInputChange}
        className="w-full h-64 border rounded p-2 font-mono"
        placeholder="Enter JSON schema here..."
      />
      <SyntaxHighlighter language="json" style={dracula} className="mt-4">
        {json}
      </SyntaxHighlighter>
    </div>
  );
};
