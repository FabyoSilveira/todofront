import { Todo } from '@/models/Todo'
import { TodoCard } from '@/components/TodoCard'
import { TodoListStyle } from './TodoList.style'

export type TodoListProps = {
  todos: Todo[]
}

export const TodoList = ({ todos }: TodoListProps): JSX.Element => {
  return (
    <div className={TodoListStyle()}>
      {todos.map((todo: Todo, index) => {
        return (
          <TodoCard
            key={index}
            title={todo.title}
            description={todo.description}
            priority={todo.priority}
            createDate={todo.createdAt}
            completed={todo.completed}
          />
        )
      })}
    </div>
  )
}
