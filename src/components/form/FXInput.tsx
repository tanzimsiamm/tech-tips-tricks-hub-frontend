// frontend/src/components/form/FXInput.tsx
'use client';

import { Input } from "@heroui/input";
import { useFormContext } from "react-hook-form";
import { IInput } from "@/src/types/common";

interface IProps extends IInput {}

export default function FXInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  className
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name] ? (errors[name]?.message as string) : "";

  return (
    <Input
      {...register(name)}
      errorMessage={errorMessage}
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
      className={className}
    />
  );
}