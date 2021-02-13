import React, { Component } from 'react'
import TokenService from '../services/token-service';

const ApiContext = React.createContext({
  task: [],
  tasksList: [],
  toDoList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  setTask: () => {},
  setTasksList: () => {},
  setToDoList: () => {},
  clearTaskList: () => {},
  setSearchTerm: () => {},
  deleteTask: () => {},
  markTask: () => {},
  addList: () => {},
  addTask: () => {},

})
export default ApiContext;

export class ApiProvider extends Component {
  state = {
    task: {},
    tasksList: [],
    user: TokenService.readJwtToken() || {},
    toDoList: [],
    error: null,
    searchTerm: ''
  };

  setSearchTerm = searchTerm => {
    this.setState({ searchTerm })
  }

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

  setTasksList = tasksList => {
    this.setState({ tasksList })
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
      task: this.state.task,
      error: this.state.error,
      searchTerm: this.state.searchTerm,
      toDoList: this.state.toDoList,
      tasksList: this.state.tasksList,
      searchTerm: this.state.searchTerm,
      setSearchTerm: this.setSearchTerm,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      setTask: this.setTask,
      setTasksList: this.setTasksList,
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
