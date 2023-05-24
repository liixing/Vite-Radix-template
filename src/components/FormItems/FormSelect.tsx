import * as React from 'react'
import {
  type PathValue,
  type FieldPath,
  type FieldValues,
  type UseFormReturn
} from 'react-hook-form'

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/ui'
import { cn } from '@/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { type SelectOption } from '@/types'

export interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
  form: UseFormReturn<TFieldValues, any>
  options: SelectOption[]
  placeholder?: string
  label?: string
  description?: React.ReactNode
  mode?: 'single' | 'multiple'
}

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  form,
  name,
  placeholder,
  options,
  label,
  description,
  mode = 'single'
}: FormSelectProps<TFieldValues, TName>): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const isSingle = mode === 'single'

  const finalPlaceholder = React.useCallback(
    (value: string | string[]) => {
      if (isSingle) {
        return value
          ? options.find((option) => option.value === value)?.label
          : `请选择${label ?? ''}`
      }

      if (Array.isArray(value) && value.length > 0) {
        return value
          .map((value) => options.find((option) => option.value === value)?.label)
          .join(', ')
      }

      return `请选择${label ?? ''}，可多选`
    },
    [label, isSingle, options]
  )

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={'flex flex-col'}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    'w-[200px] justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {finalPlaceholder(field.value)}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder={placeholder ?? `搜索${label ?? ''}`} />
                <CommandEmpty>未找到</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option.value}
                      key={option.value}
                      onSelect={(value) => {
                        isSingle
                          ? form.setValue(name, value as PathValue<TFieldValues, TName>)
                          : form.setValue(
                              name,
                              Array.isArray(field.value)
                                ? field.value.includes(value)
                                  ? field.value.filter((v: string) => v !== value)
                                  : [...field.value, value]
                                : [value]
                            )
                        isSingle && setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          option.value === field.value ||
                            (Array.isArray(field.value) && field.value.includes(option.value))
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
