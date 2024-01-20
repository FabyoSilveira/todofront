import api from '@/api'
import { Todo, TodoDTO } from '@/models'

export const getAllTodos = async (): Promise<Todo[]> => {
  return await api
    .get('/todo/all')
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
      return []
    })
}

export const getTodo = async (todoId: string): Promise<Todo> => {
  return await api
    .get(`/todo/get/${todoId}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
      return {}
    })
}

export const createTodo = async (todo: TodoDTO): Promise<string | TodoDTO> => {
  return await api
    .post('/todo/add', todo)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
      return 'Erro ao salvar todo!'
    })
}

export const updateTodo = async (todo: Todo): Promise<string | Todo> => {
  return await api
    .put('/todo/update', todo)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
      return 'Erro ao editar todo!'
    })
}

export const completeTodo = async (todo: Todo): Promise<string | Todo> => {
  return await api
    .put('/todo/complete', todo)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
      return 'Erro ao completar todo!'
    })
}

export const deleteTodo = async (todoId: string): Promise<string | Todo> => {
  return await api
    .delete(`http://localhost:8080/todo/delete/${todoId}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
      return 'Erro ao deletar todo!'
    })
}
