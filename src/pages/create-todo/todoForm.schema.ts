import { object, string, number } from 'yup'

const validationMessages = {
  required: 'Campo obrigatório!',
}

export const todoFormSchema = object({
  title: string().required(validationMessages.required),
  description: string().required(validationMessages.required),
  priority: number().required().positive().integer(),
})
