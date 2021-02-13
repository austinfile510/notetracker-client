import React, { Component } from 'react'
import TokenService from '../services/token-service';

const ApiContext = React.createContext({
  task: [],
  tasks: [],
  toDoList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  setTask: () => {},
  setTasks: () => {},
  setToDoList: () => {},
  clearTaskList: () => {},
  deleteTask: () => {},
  markTask: () => {},
  addList: () => {},
  addTask: () => {},

})
export default ApiContext;

export class ApiProvider extends Component {
  state = {
    task: {},
    tasks: [],
    user: TokenService.readJwtToken() || {},
    toDoList: [],
    error: null,
  };

  deleteList = list_id => {
    this.setState({
      list: this.state.list.filter((list => list.id !== list))
    })
  }

  deleteTask = task_id => {
    this.setState({
      task: this.state.task.filter((task) => task.id !== task_id)
    })
  }

  setTask = task => {
    this.setState({ task })
  }

  setTasks = tasks => {
    this.setState({ tasks })
  }

  setUser = user => {
    this.setState({ user })
  }

  setToDoList = toDoList => {
    this.setState({ toDoList })
  }

  clearToDoList = toDoList => {
    this.setState({ toDoList: []})
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  addList = toDoList => {
    this.setState({ toDoList })
  }

  addTask = task => {
    this.setState({ task })
  }

  render() {
    const value = {
      user: this.state.user,
      recipeList: this.state.recipeList,
      error: this.state.error,
      searchTerm: this.state.searchTerm,
      toDoList: this.state.toDoList,
      tasks: this.state.tasks,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      setTask: this.setTask,
      setTasks: this.setTasks,
      addList: this.addList,
      addTask: this.addTask,
      setToDoList: this.setToDoList,
      clearToDoList: this.clearToDoList,
      deleteTask: this.deleteTask,
      setSearchTerm: this.setSearchTerm,
    }
    return (
      <ApiContext.Provider value={value}>
        {this.props.children}
      </ApiContext.Provider>
    )
  }
}
