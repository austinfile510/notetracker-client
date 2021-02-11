import React from 'react'
import Task from '../Task/Task'
import ApiContext from '../contexts/ApiContext'
import { findTask } from '../tasks-helpers'


export default class TaskPage extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteTask = taskId => {
    this.props.history.push(`/`)
  }

  render() {
    const { tasks=[] } = this.context
    const { taskId } = this.props.match.params
    const task = findTask(tasks, taskId) || { content: '' }
    return (
      <section className='taskPageMain'>
        <Task
          id={task.id}
          title={task.title}
          modified={task.modified}
          onDeleteTask={this.handleDeleteTask}
        />
        <div className='taskPageMain__content'>
          {task.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}