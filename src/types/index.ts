import { type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'

export interface SelectOption {
  value: string
  label: string
}

export interface FormItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
  form: UseFormReturn<TFieldValues, any>
  placeholder?: string
  label?: string
  description?: React.ReactNode
}
