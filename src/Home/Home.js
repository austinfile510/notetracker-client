import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

export default class Home extends Component {
	render() {
		return (
			<main>
                <h2>Welcome to NoteTracker!</h2>
				<p>
					NoteTracker is designed with users in mind. Keep track of what's
					important to you. Add and remove tasks easily. Never miss another deadline!
				</p>

                <h3>Example To-Do List</h3>
                <ol>
                    <li>Example List Item </li><input type='checkbox' />
                    <li>Example List Item </li><input type='checkbox' />
                    <li>Example List Item </li><input type='checkbox' />
                    <li>Example List Item </li><input type='checkbox' />
                    <li>Example List Item </li><input type='checkbox' />
                    <li>Example List Item </li><input type='checkbox' />
                </ol>
			</main>
		);
	}
}
