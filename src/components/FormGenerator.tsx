import React from 'react';
import { useForm, Controller, FieldValues, RegisterOptions } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  validation?: {
    pattern?: string; // Pattern can be a string that we will convert to a RegExp
    message?: string;
  };
  options?: { value: string; label: string }[];
}

interface FormGeneratorProps {
  schema: {
    formTitle?: string;
    formDescription?: string;
    fields: Field[];
  };
}

export const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { handleSubmit, register, formState: { errors } } = useForm<FieldValues>();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    alert("Form Submitted Successfully! Check the console for details.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Form Title and Description */}
      {schema.formTitle && <h1 className="text-2xl font-bold">{schema.formTitle}</h1>}
      {schema.formDescription && <p className="text-gray-600">{schema.formDescription}</p>}

      {/* Generate Fields Dynamically */}
      {schema.fields.map((field) => (
        <div key={field.id} className="space-y-1">
          <label htmlFor={field.id} className="block font-medium">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>

          {/* Render Different Input Types */}
          {field.type === 'text' || field.type === 'email' ? (
            <input
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              {...register(field.id, {
                required: field.required ? `${field.label} is required` : false,
                pattern: field.validation?.pattern
                  ? {
                      value: new RegExp(field.validation.pattern),  // Convert string to RegExp
                      message: field.validation.message,
                    } as RegisterOptions['pattern']  // Explicitly typing this as RegisterOptions['pattern']
                  : undefined,
              })}
              className="w-full p-2 border rounded"
            />
          ) : field.type === 'textarea' ? (
            <textarea
              id={field.id}
              placeholder={field.placeholder}
              {...register(field.id, { required: field.required })}
              className="w-full p-2 border rounded"
            />
          ) : field.type === 'select' ? (
            <select
              id={field.id}
              {...register(field.id, { required: field.required })}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Select an option --</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'radio' ? (
            <div>
              {field.options?.map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={option.value}
                    {...register(field.id, { required: field.required })}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          ) : null}

          {/* Validation Error Messages */}
          {errors[field.id] && (
            <p className="text-red-500 text-sm">{(errors[field.id] as any)?.message}</p>
          )}
        </div>
      ))}

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};
