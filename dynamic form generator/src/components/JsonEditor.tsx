import React, { useState } from 'react';
import { FormSchema } from './types';

interface JsonEditorProps {
  onSchemaChange: (schema: FormSchema) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onSchemaChange }) => {
  const [json, setJson] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setJson(value);
    try {
      const parsed = JSON.parse(value);
      onSchemaChange(parsed);
    } catch (e) {
      console.error('Invalid JSON:', e);
    }
  };

  return (
    <textarea
      className="w-full h-full p-4 border-2 border-gray-300"
      value={json}
      onChange={handleChange}
      placeholder="Enter JSON schema here"
    />
  );
};

export default JsonEditor;