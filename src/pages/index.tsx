import api from '@/api'
import { Todo } from '@/models/Todo'

type HomePageProps = {
  todos: Todo[]
}

export default function Home({ todos }: HomePageProps) {
  console.log(todos)
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col gap-2">
        {todos.map((todo: Todo) => {
          return (
            <div className="flex flex-col gap-2 justify-center p-2 h-max w-max rounded bg-white shadow-inner shadow-white">
              <h1 className="font-bold">{todo.title}</h1>
              <span>{todo.description}</span>
            </div>
          )
        })}
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
