import axios from "axios"

const TODOS_URL = "http://localhost:1212/"

class UserServices {
  getTodo = () => {
    return axios.get(TODOS_URL+"todos", {
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    })
  }

  postTodo = (todo) => {
    return axios.post(TODOS_URL+"todo", {
      "id": todo.id,
      "task": todo.task,
      "status": todo.status
    })
  }

  updateTodo = (todo) => {
    return axios.put(TODOS_URL+"update/"+todo.id, {
      "id": todo.id,
      "task": todo.task,
      "status": todo.status?1:0,
    })
  }

  deleteTodo = (id) => {
    return axios.delete(TODOS_URL+"delete/"+id)
  }
}

export default new UserServices