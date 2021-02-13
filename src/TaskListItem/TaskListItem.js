import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Hyph } from '../Utils/Utils';
import config from '../config';
import Moment from 'moment';
import NoteTrackerApiService from '../services/notetracker-api-service';
import ApiContext from '../contexts/ApiContext';

function deleteTaskRequest(taskId, callback) {
	NoteTrackerApiService.deleteTask()
		.then((res) => {
			if (!res.ok) {
				return res.json().then((error) => {
					throw error;
				});
			}
			return res.json();
		})
		.then((data) => {
			callback(taskId);
		})
		.catch((error) => {
			console.error(error);
		});
}
export default class TaskListItem extends Component {
	state = {
		task: {},
		user: {},
	};

	static contextType = ApiContext;

	static defaultProps = {
		onDeleteTask: () => {},
	};

	handleClickDelete = (e) => {
		const { taskId } = this.props.match.params;
		NoteTrackerApiService.deleteTask(taskId).then(() => {
			this.props.history.push('/my-tasks');
		});
	};

	render() {
		const { task } = this.props;
		return (
			<ApiContext.Consumer>
				{(context) => (
					<div name='TaskListItem' className='TaskListItem__container'>
						{/* <Link to={`/tasks/${task.id}`}> */}
							<h4>{task.title}</h4>
						{/* </Link> */}
						<span className='shadow'>
							<p>{task.content}</p>
						</span>
						<Hyph />
						<span className='shadow'>
							<p>{Moment(task.modified).format('MMMM Do, YYYY')}</p>
						</span>

						{/* <button TO DO - Delete Button implementation.
							className='delete-button'
							onClick={() =>
								deleteTaskRequest(this.props.id, context.deleteTask)
							}
						>
							Delete
						</button> */}
					</div>
				)}
			</ApiContext.Consumer>
		);
	}
}
