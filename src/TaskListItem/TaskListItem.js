import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Hyph } from '../Utils/Utils';
import Moment from 'moment';


export default class TaskListItem extends Component {
	render() {
		const { task } = this.props;
		return (
			<div name='TaskListItem' className='TaskListItem__container'>
				{/* <Link
					to={`/tasks/${task.id}`}> */}
					<h4>
						{task.title}
					</h4>
				{/* </Link> */}
				<span className='shadow'>
					<p>{task.content}</p>
				</span>
				<Hyph />
				<span className='shadow'>
					<p>{Moment(task.modified).format('MMMM Do, YYYY')}</p>
				</span>
			</div>
		);
	}
}
