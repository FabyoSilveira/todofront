import { useFormik } from 'formik'
import { Button, Input as InputAntd, Rate } from 'antd'

import { todoFormSchema } from './todoForm.schema'
import { FireFilled } from '@ant-design/icons'
import { createTodo } from '@/service/TodoService'
import { TodoDTO } from '@/models'
import { useRouter } from 'next/router'
import { Input } from '@/components/Input'
import { TextArea } from '@/components/TextArea'

const customPriorityIcons: Record<number, React.ReactNode> = {
  1: <FireFilled />,
  2: <FireFilled />,
  3: <FireFilled />,
}

export default function CreateTodo() {
  const router = useRouter()

  const todoForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      priority: 1,
    } as TodoDTO,
    validationSchema: todoFormSchema,
    onSubmit: async (values: TodoDTO) => {
      const todo = await createTodo(values)

      if (typeof todo === 'string') {
        return
      }

      router.push('/')
    },
  })

  return (
    <form onSubmit={todoForm.handleSubmit}>
      <div className="flex flex-col items-center w-screen h-screen px-4">
        <h1 className="font-mono text-[40px] mt-[50px] mb-[60px]">
          Criar nova tarefa
        </h1>
        <div className="flex flex-col w-full max-w-[500px] gap-4">
          <Input
            id="title"
            name="title"
            label="Título"
            size="middle"
            placeholder="Título da sua tarefa"
            hasError={todoForm.touched.title && todoForm.errors.title}
            errorMessage={todoForm.errors.title}
            value={todoForm.values.title}
            onChange={todoForm.handleChange}
          />
          <TextArea
            id="description"
            label="Descrição"
            size="middle"
            placeholder="Descrição da sua tarefa"
            hasError={
              todoForm.touched.description && todoForm.errors.description
            }
            errorMessage={todoForm.errors.description}
            value={todoForm.values.description}
            onChange={todoForm.handleChange}
          />
          <div className="flex flex-col">
            <span className="font-mono font-bold">Prioridade</span>
            <Rate
              id="priority"
              count={3}
              value={todoForm.values.priority}
              onChange={(val) => {
                todoForm.setFieldValue('priority', val)
              }}
              character={({ index = 0 }) => customPriorityIcons[index + 1]}
            />
          </div>
          <Button
            htmlType="submit"
            type="primary"
            className="mb-4 mt-2 bg-blue-600 text-white text-[17px] w-full h-[40px] rounded-[10px]"
          >
            Criar
          </Button>
        </div>
      </div>
    </form>
  )
}
