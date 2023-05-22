import * as React from 'react'
import { type UseFormReturn } from 'react-hook-form'

import { Input } from '@/ui/input'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui'

export interface FormInputProps {
  name: string
  form: UseFormReturn<any>
  placeholder?: string
  label?: string
  description?: React.ReactNode
}

export function FormInput({
  form,
  name,
  placeholder,
  label,
  description
}: FormInputProps): JSX.Element {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder ?? `请输入${label ?? ''}`} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
