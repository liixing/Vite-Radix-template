import { type FieldPath, type FieldValues } from 'react-hook-form'

import {
  Button,
  Calendar,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/ui'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { DATE_FORMAT, cn } from '@/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { type FormItemProps } from '@/types'

export function FormRangePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  form,
  name,
  placeholder,
  label,
  description
}: FormItemProps<TFieldValues, TName>): JSX.Element {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value?.from ? (
                    field.value?.to ? (
                      <>
                        {format(field.value.from, DATE_FORMAT)} -{' '}
                        {format(field.value.to, DATE_FORMAT)}
                      </>
                    ) : (
                      format(field.value.from, DATE_FORMAT)
                    )
                  ) : (
                    <span>{placeholder ?? '开始时间～结束时间'}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
