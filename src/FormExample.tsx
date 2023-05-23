import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button, Form, toast } from '@/ui'
import { FormDatePicker, FormInput, FormRangePicker, FormSelect } from '@/components'
import { type SelectOption } from './types'

const FormSchema = z.object({
  name: z.string().min(2, {
    message: '名字不能少于2个字符'
  }),
  years: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => value > 1, {
      message: '年龄不能小于1'
    }),
  date: z.date().optional(),
  rangeDate: z
    .object({
      from: z.date().optional(),
      to: z.date().optional()
    })
    .optional()
})

type FormValues = z.infer<typeof FormSchema>

const defaultValues: Partial<FormValues> = { name: '' }

const options: SelectOption[] = [
  { value: '1', label: '1岁' },
  { value: '2', label: '2岁' }
]

export function MyForm(): JSX.Element {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues
  })

  function onSubmit(data: FormValues): void {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormInput<FormValues>
          name="name"
          form={form}
          label="名字"
          placeholder="请输入一下你的名字"
        />
        <FormSelect<FormValues> name="years" label="年龄" form={form} options={options} />
        <FormDatePicker<FormValues> name="date" form={form} />
        <FormRangePicker<FormValues> form={form} name="rangeDate" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
