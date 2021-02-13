import React from 'react';
import { Link } from 'react-router-dom';
import Task from '../Task/Task';
import ApiContext from '../contexts/ApiContext';
import { getTasksForList } from '../tasks-helpers';
import Header from '../Header/Header';
import NoteTrackerApiService from '../services/notetracker-api-service';
import { Hyph } from '../Utils/Utils'

export default class ToDoListPage extends React.Component {
	static defaultProps = {
		match: {
			params: {},
		},
	};
	static contextType = ApiContext;
    state = {
        tasks: [],
    }

   
    
	componentDidMount() {
		NoteTrackerApiService.getLists()
			.then((toDoList) => {
				this.context.setToDoList(toDoList);
				return NoteTrackerApiService.getTasks();
			})
			.then((tasks) => {

			    this.setState({tasks});
			});
	}

	render() {
		const { list_id } = this.props.match.params;
		const { toDoList } = this.context;
        const { tasks } = this.state;
		const tasksForList = getTasksForList(tasks, list_id);
		return (
			<div>
				<Header />
				<section className='ToDoListPage'>
					<h2>My Tasks</h2>

					<select required id='task-list-select' name='task-list-id'>
						<option value={null}>...</option>
						{toDoList.map((list) => (
							<option key={list.id} value={list.id}>
								{list.list_name}
							</option>
						))}
					</select>
					<ul>
						{tasks.map((task) => (
							<li key={task.id}>
								
									{task.id}
                                    <Hyph />
									{task.title}
                                    <Hyph />
									{task.modified}
			
								<button>Delete</button>
							</li>
						))}
					</ul>
				</section>
			</div>
		);
	}
}
