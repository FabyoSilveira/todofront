import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import { Todo } from '@/models/Todo'
import { TodoCard } from '@/components/TodoCard'
import { TodoListStyle } from './TodoList.style'
import { completeTodo, deleteTodo } from '@/service/TodoService'

export type TodoListProps = {
  todos: Todo[]
  refreshList: (id: string) => void
}

export const TodoList = ({
  todos,
  refreshList,
}: TodoListProps): JSX.Element => {
  const router = useRouter()

  return (
    <div className={TodoListStyle()}>
      {todos.length > 0 ? (
        todos.map((todo: Todo, index) => {
          return (
            <TodoCard
              key={index}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              priority={todo.priority}
              createDate={todo.createdAt}
              completed={todo.completed}
              onComplete={async () => {
                Swal.fire({
                  title: 'Completar tarefa?',
                  showCancelButton: true,
                  confirmButtonText: 'Sim',
                  cancelButtonText: 'Cancelar',
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    const res = await completeTodo({
                      id: todo.id,
                      title: todo.title,
                      description: todo.description,
                      createdAt: todo.createdAt,
                      priority: todo.priority,
                      completed: true,
                    })
                    refreshList(todo.id)
                  }
                })
              }}
              onDelete={async () => {
                Swal.fire({
                  title: 'Excluir tarefa?',
                  showCancelButton: true,
                  confirmButtonText: 'Sim',
                  cancelButtonText: 'Cancelar',
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    const res = await deleteTodo(todo.id)
                    refreshList(todo.id)
                  }
                })
              }}
              onEdit={() => {
                router.push(`/edit-todo/${todo.id}`)
              }}
            />
          )
        })
      ) : (
        <span className="font-bold text-[18px]">
          Sua lista de tarefas está vazia! :)
        </span>
      )}
    </div>
  )
}
