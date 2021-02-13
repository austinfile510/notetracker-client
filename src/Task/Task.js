import React from 'react';
import NoteTrackerApiService from '../services/notetracker-api-service';
import Header from '../Header/Header';
import Moment from 'moment';

import ApiContext from '../contexts/ApiContext';

class task extends React.Component {
	state = {
		task: {},
		user: {},
	};

	static contextType = ApiContext;

	static defaultProps = {
		onDeleteTask: () => {},
	};

	componentDidMount() {
		const { taskId } = this.props.match.params;
		NoteTrackerApiService.getTask(taskId).then((task) =>
			this.setState({ task })
		);
	}

	handleClickDelete = (e) => {
		const { taskId } = this.props.match.params;
		NoteTrackerApiService.deleteTask(taskId).then(() => {
			this.props.history.push('/my-tasks');
		});
	};

	renderDeleteButton() {
		// TO DO - Implement button so it only shows when the registered logged in user matches the task's user ID
		const { taskId } = this.props.match.params;
		if (this.context.user.user_id !== this.state.task.user_id) {
			return;
		} else
			return (
				<button className='delete-button' onClick={() => this.handleClickDelete(taskId)}>
					Delete task
				</button>
			);
	}

	render() {
		console.log(this.context);
		const { task } = this.state;
		return (
			<div name='task-page'>
				<main className='task__container shadow' role='main'>
					<header>
          <Header />
					</header>

					<h2 style={{color: 'darkgreen'}}>{task.title}</h2>

					<h3>task Description:</h3>

					<p>{task.description}</p>

					<h3>Ingredients:</h3>

					<p>{task.ingredients}</p>

					<h3>Instructions:</h3>

					<p>{task.instructions}</p>

					<h3>task Type:</h3>
					<p>{task.meal_type}</p>

					<h3>Author:</h3>
					<p>{task.author}</p>

					<h4>Date Modified:</h4>

					<p>{Moment(task.date_modified).format('MMMM Do, YYYY')}</p>

					{this.renderDeleteButton()}
				</main>
			</div>
		);
	}
}

export default task;