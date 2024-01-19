import api from '@/api'
import { Todo } from '@/models/Todo'
import { TodoList } from '@/components/TodoList'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

type HomePageProps = {
  todos: Todo[]
}

export default function Home({ todos }: HomePageProps) {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(
    todos
      .sort((a, b) => b.priority - a.priority)
      .sort((a, b) => Number(a.completed) - Number(b.completed))
  )

  const filterTodosByKeyword = (keyword: string): void => {
    setFilteredTodos(
      todos.filter((todo: Todo) =>
        todo?.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      )
    )
  }

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <h1 className="font-mono text-[40px] mt-[50px] mb-[60px]">TODO LIST</h1>
      <div className="flex flex-col w-full max-w-[500px] gap-4">
        <Input
          size="large"
          placeholder="Pesquise pelo título da sua tarefa"
          prefix={<SearchOutlined />}
          onChange={(ev) => {
            filterTodosByKeyword(ev.target.value)
          }}
        />
        <TodoList todos={filteredTodos} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const todos: Todo[] = await api
    .get('/todo/all')
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
      return []
    })

  return {
    props: { todos },
  }
}
