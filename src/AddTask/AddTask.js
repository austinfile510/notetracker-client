import React, { Component } from 'react';
import NoteTrackerForm from '../NoteTrackerForm/NoteTrackerForm';
import ApiContext from '../contexts/ApiContext';
import config from '../config';
import Header from '../Header/Header';
import NoteTrackerApiService from '../services/notetracker-api-service';

export default class AddTask extends Component {
	static defaultProps = {
		history: {
			push: () => {},
		},
	};
	static contextType = ApiContext;

	componentDidMount() {
		NoteTrackerApiService.getLists().then((toDoList) => {
			this.context.setToDoList(toDoList);
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const newTask = {
			title: e.target['task-name'].value,
			content: e.target['task-content'].value,
			list_id: e.target['task-list-id'].value,
			modified: new Date(),
		};
		NoteTrackerApiService.addTask(newTask)
			.then((task) => {
				this.context.addTask(task);
				this.props.history.push(`/my-tasks`);
			})
			.catch((error) => {
				console.error({ error });
			});
	};

	render() {
		const { toDoList = [] } = this.context;
		return (
			<div>
				<Header />

				<section className='AddTask'>
					<h2>Create a Task</h2>
					<NoteTrackerForm onSubmit={this.handleSubmit}>
						<div className='field'>
							<label htmlFor='task-name-input'>Name</label>
							<input
								required
								type='text'
								id='task-name-input'
								name='task-name'
							/>
						</div>
						<div className='field'>
							<label htmlFor='task-content-input'>Content</label>
							<textarea id='task-content-input' name='task-content' />
						</div>
						<div className='field'>
							<label htmlFor='task-list-select'>To-Do List</label>
							<select required id='task-list-select' name='task-list-id'>
								<option value={null}>...</option>
								{toDoList.map((list) => (
									<option key={list.id} value={list.id}>
										{list.list_name}
									</option>
								))}
							</select>
						</div>
						<div className='buttons'>
							<button type='submit'>Add Task</button>
						</div>
					</NoteTrackerForm>
				</section>
			</div>
		);
	}
}
