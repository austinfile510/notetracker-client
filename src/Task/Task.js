import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ApiContext from '../contexts/ApiContext'
import config from '../config'
import NoteTrackerApiService from '../services/notetracker-api-service'


export default class Task extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    NoteTrackerApiService
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { title, id, modified } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/notes/${id}`}>
            {title}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
