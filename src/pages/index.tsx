import { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import {
  LoadingOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import { Todo } from '@/models/Todo'
import { TodoList } from '@/components/TodoList'
import { getAllTodos } from '@/service/TodoService'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [todos, setTodos] = useState<Todo[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const todos: Todo[] = await getAllTodos()

    setTodos(
      todos
        .sort((a, b) => b.priority - a.priority)
        .sort((a, b) => Number(a.completed) - Number(b.completed))
    )
  }

  return (
    <div className="flex flex-col items-center w-screen h-screen px-4">
      <h1 className="font-mono text-[40px] mt-[50px] mb-[60px]">
        Lista de tarefas
      </h1>
      <div className="flex flex-col w-full max-w-[500px] gap-4">
        <Input
          size="large"
          variant="borderless"
          placeholder="Pesquise pelo título da sua tarefa"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(ev) => {
            setSearch(ev.target.value)
          }}
        />
        <TodoList
          todos={todos.filter((todo: Todo) =>
            todo?.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )}
          refreshList={() => {
            fetchTodos()
          }}
        />

        <Button
          type="primary"
          className="mb-4 mt-2 bg-blue-600 text-white text-[17px] w-full h-[40px] rounded-[10px]"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            router.push('/create-todo')
          }}
        >
          Criar nova tarefa
        </Button>
      </div>
    </div>
  )
}
