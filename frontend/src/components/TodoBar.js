import React from 'react'
import UserServices from '../service/UserServices'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

class TodoBar extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      id: 11111231,
      task: "",
      status: 0,
    }
  }

  onChange = (event) => {
    this.setState({
      task: event.target.value
    })
    event.preventDefault()
  }

  onClick = () => {
    if (this.state.task.length>0) {
      let todo = { id: this.state.id, task: this.state.task, status: this.state.status }
      UserServices.postTodo(todo)
      .then(res => {
        this.setState({
          task: ""
        })
      }).finally(
        this.forceUpdate()
      )
    }
  }

  render() {
    return (
      <InputGroup className="mb-3">
        <FormControl value={this.state.todo} onChange={this.onChange}/>
        <Button variant="outline-secondary" onClick={() => {this.props.onClick(this.state)}}>
          Add
        </Button>
      </InputGroup>
    )
  }
}

export default TodoBar