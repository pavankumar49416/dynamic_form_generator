import React from 'react';
import { useForm } from 'react-hook-form';
import { FormSchema } from './types';

interface FormGeneratorProps {
  schema: FormSchema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <h2 className="text-lg font-bold">{schema.formTitle}</h2>
      <p className="mb-4">{schema.formDescription}</p>
      {schema.fields.map((field) => {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'textarea':
            return (
              <div key={field.id} className="mb-4">
                <label className="block mb-1">{field.label}</label>
                <input
                  {...register(field.id, { required: field.required })}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="border p-2 w-full"
                />
                {errors[field.id] && <span className="text-red-500">{field.label} is required</span>}
              </div>
            );
          case 'select':
            return (
              <div key={field.id} className="mb-4">
                <label className="block mb-1">{field.label}</label>
                <select {...register(field.id, { required: field.required })} className="border p-2 w-full">
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors[field.id] && <span className="text-red-500">{field.label} is required</span>}
              </div>
            );
          case 'radio':