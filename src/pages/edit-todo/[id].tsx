import { useFormik } from 'formik'
import { Button, Rate } from 'antd'

import { todoFormSchema } from '../create-todo/todoForm.schema'
import { FireFilled } from '@ant-design/icons'
import { getTodo, updateTodo } from '@/service/TodoService'
import { Todo, TodoDTO } from '@/models'
import { useRouter } from 'next/router'
import { Input } from '@/components/Input'
import { TextArea } from '@/components/TextArea'
import { useEffect, useState } from 'react'
import { todo } from 'node:test'

const customPriorityIcons: Record<number, React.ReactNode> = {
  1: <FireFilled />,
  2: <FireFilled />,
  3: <FireFilled />,
}

export default function CreateTodo() {
  const router = useRouter()
  const { id } = router.query
  const [todo, setTodo] = useState<Todo>()

  useEffect(() => {
    fetchTodo()
  }, [id, fetchTodo])

  const todoForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      priority: 1,
    } as TodoDTO,
    validationSchema: todoFormSchema,
    onSubmit: async (values: TodoDTO) => {
      const editedTodo = await updateTodo({
        id: todo?.id as string,
        title: values.title,
        description: values.description,
        priority: values.priority,
        completed: todo?.completed as boolean,
        createdAt: todo?.createdAt as string,
      })

      if (typeof editedTodo === 'string') {
        return
      }

      router.push('/')
    },
  })

  const fetchTodo = async (): Promise<void> => {
    const todo: Todo = await getTodo(id as string)
    if (todo) {
      todoForm.setFieldValue('title', todo.title)
      todoForm.setFieldValue('description', todo.description)
      todoForm.setFieldValue('priority', todo.priority)
    }

    setTodo(todo)
  }

  return (
    <form onSubmit={todoForm.handleSubmit}>
      <div className="flex flex-col items-center w-screen h-screen px-4">
        <h1 className="font-mono text-[40px] mt-[50px] mb-[60px]">
          Editar tarefa
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
            Salvar
          </Button>
        </div>
      </div>
    </form>
  )
}
