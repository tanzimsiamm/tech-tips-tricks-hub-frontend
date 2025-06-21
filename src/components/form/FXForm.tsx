// frontend/src/components/form/FXForm.tsx
'use client';

import { ReactNode } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';

interface FXFormProps<TFieldValues extends FieldValues = FieldValues> {
  children: ReactNode;
  onSubmit: SubmitHandler<TFieldValues>;
  options?: UseFormProps<TFieldValues>;
  resolver?: any; // Zod resolver type
}

export default function FXForm<TFieldValues extends FieldValues = FieldValues>({
  children,
  onSubmit,
  options,
  resolver,
}: FXFormProps<TFieldValues>) {
  const methods = useForm<TFieldValues>({ ...options, resolver });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}