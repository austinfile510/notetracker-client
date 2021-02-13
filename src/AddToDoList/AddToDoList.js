import React, { Component } from 'react'
import NoteTrackerForm from '../NoteTrackerForm/NoteTrackerForm'
import ApiContext from '../contexts/ApiContext'
import config from '../config'
import Header from '../Header/Header'
import NoteTrackerApiService from '../services/notetracker-api-service'

export default class AddToDoList extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const list = {
      list_name: e.target['list-name'].value
    }
    NoteTrackerApiService.addList(list)
      .then(list => {
        this.context.addList(list)
        this.props.history.push(`/tasks`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (<div>
    <Header />
      <section className='AddList'>
        <h2>Create a new List</h2>
        <NoteTrackerForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='list-name-input'>
              Name
            </label>
            <input type='text' id='list-name-input' name='list-name' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add To-Do List
            </button>
          </div>
        </NoteTrackerForm>
      </section>
      </div>
    )
  }
}
