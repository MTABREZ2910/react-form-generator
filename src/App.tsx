import React, { useState } from "react";
import { JsonEditor } from "./components/JsonEditor";
import { FormGenerator } from "./components/FormGenerator";

const App = () => {
  const [schema, setSchema] = useState(null);

  const handleSchemaChange = (json: string) => {
    try {
      const parsedSchema = JSON.parse(json);
      setSchema(parsedSchema);
    } catch (error) {
      console.error("Invalid JSON format:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Flexbox container for left and right columns */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: JSON Editor */}
        <div className="flex-1 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">JSON Editor</h2>
          <JsonEditor onChange={handleSchemaChange} />
        </div>

        {/* Right Side: Form Preview */}
        <div className="flex-1 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Generated Form</h2>
          {schema ? (
            <FormGenerator schema={schema} />
          ) : (
            <p className="text-gray-500">Please provide valid JSON to generate the form.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
