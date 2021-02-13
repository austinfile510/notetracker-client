import React from 'react';
import { Link } from 'react-router-dom';
import Task from '../Task/Task';
import ApiContext from '../contexts/ApiContext';
import { getTasksForList } from '../tasks-helpers';
import Header from '../Header/Header';
import NoteTrackerApiService from '../services/notetracker-api-service';
import { Hyph, Section } from '../Utils/Utils';
import Select from 'react-select';
import SearchBar from '../SearchBar/SearchBar';
import TaskListItem from '../TaskListItem/TaskListItem';

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
export default class TasksPage extends React.Component {
	state = {
		task: {},
		user: {},
	};

	static contextType = ApiContext;

	static defaultProps = {
		onDeleteRecipe: () => {},
	};

	componentDidMount() {
		this.context.clearError();
		NoteTrackerApiService.getTasksList()
			.then(this.context.setTasksList)
			.catch(this.context.setError);
	}

	filterTasks = (tasksList, searchTerm) => {
		if (!searchTerm) {
			return tasksList;
		}

		return tasksList.filter((task) => {
			const taskTitle = task.title.toLowerCase();
			return taskTitle.includes(searchTerm.toLowerCase());
		});
	};

	renderTasks() {
		const { tasksList = [], searchTerm } = this.context;
		const filteredTasks = this.filterTasks(tasksList, searchTerm);
		return filteredTasks.map((task) => (
			<TaskListItem key={task.id} task={task} />
		));
	}

	render() {
		const { error, tasksList } = this.context;

		return (
			<ApiContext.Consumer>
				{(context) => (
					<div>
						<Header />
						<section className='TasksPage'>
							<h2>My Tasks</h2>

							<SearchBar />

							<Section list className='MyTasksPage'>
								{error ? (
									<p className='red'>There was an error, try again</p>
								) : (
									this.renderTasks()
								)}
							</Section>
						</section>
					</div>
				)}
			</ApiContext.Consumer>
		);
	}
}
