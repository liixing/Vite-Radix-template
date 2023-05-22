import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, toast } from '@/ui'
import { FormDatePicker, FormInput, FormSelect } from '@/components'
import { type SelectOption } from './types'

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  years: z.number().int().min(0).max(100).optional()
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
        <FormInput name="name" form={form} label="名字" placeholder="请输入一下你的名字" />
        <FormSelect name="years" label="年龄" form={form} options={options} />
        <FormDatePicker name="date" form={form} />
      </form>
    </Form>
  )
}
