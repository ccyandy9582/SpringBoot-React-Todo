import React from 'react'
import UserServices from '../service/UserServices'
import { Container, Table } from 'react-bootstrap'
import TodoItem from './TodoItem'
import TodoBar from './TodoBar'
import { unmountComponentAtNode } from 'react-dom'

class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      todos: []
    }
  }

  updateTodos = () => {
    UserServices.getTodo().then(res => {
      this.setState({ todos: res.data })
    })
  }

  componentDidMount() {
    this.updateTodos()
  }

  onClickDelete = (id) => {
    UserServices.deleteTodo(id)
    .finally(this.updateTodos)
  }

  onClickCreate = (todo) => {
    if (todo.task.length>0) {
      UserServices.postTodo(todo).finally(this.updateTodos)
    }
  }

  render() {
    const todos = this.state.todos.map(todo => {
      return <TodoItem todo={todo} key={todo.task+todo.id} onClick={this.onClickDelete}/>
    })
    return (
      <Container>
        <div style={{marginTop: `${10}px`}}></div>
        <TodoBar onClick={this.onClickCreate}/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos}
          </tbody>
        </Table>
      </Container>

    )
  }
}

export default TodoApp