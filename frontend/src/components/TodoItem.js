import React from 'react'
import UserServices from '../service/UserServices'

class TodoItem extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      id: this.props.todo.id,
      task: this.props.todo.task,
      status: this.props.todo.status==1?true:false
    }
  }

  toggleChange = () => {
    let newTodo = {id: this.state.id, task: this.state.task, status: !this.state.status}
    UserServices.updateTodo(newTodo)
    .then(
      this.setState({
        status: !this.state.status
      })
    ).catch(err => {
        console.error(err.response);
      }
    )
  }

  render() {
    return (
      <tr key={this.state.task+this.state.id} id={this.state.task+this.state.id}>
        <td>{this.state.id}</td>
        <td>{this.state.task}</td>
        <td><input type="checkbox" defaultChecked={this.state.status} onChange={this.toggleChange}/></td>
        <td><button style={{height: `${30}px`, width: `${30}px`, textAlign: 'center'}} onClick={()=> this.props.onClick(this.state.id)}>X</button></td>
      </tr>
    )
  }
}

export default TodoItem