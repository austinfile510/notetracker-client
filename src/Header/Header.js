import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Hyph } from '../Utils/Utils';
import TokenService from '../services/token-service';
import '../index.css';


export default class Header extends Component {
	handleLogoutClick = () => {
		TokenService.clearAuthToken();
		/* when logging out, clear the callbacks to the refresh api and idle auto logout */
		TokenService.clearCallbackBeforeExpiry();
		
	};

	renderLogoutLink() {
		return (
			<nav className='Header__logged-in'>
				<Link to='./my-tasks'>My tasks</Link>
				<Hyph />
				<Link to='/add-to-do-list'>Create To-Do List</Link>
				<Hyph />
				<Link to='/add-task'>Create Task</Link>
				<Hyph />
				<Link onClick={this.handleLogoutClick} to='/'>
					Logout
				</Link>
			</nav>
		);
	}

	renderLoginLink() {
		return (
			<nav className='Header__not-logged-in'>
				<Link to='/register'>Register</Link>
				<Hyph />
				<Link to='/login'>Log in</Link>
			</nav>
		);
	}

	render() {
		return (
			<nav className='Header'>
				<h1 style= {{"text-decoration-line": "none" }} className='main-heading'>
					<Link to='/'>NoteTracker</Link>
				</h1>
				{TokenService.hasAuthToken()
					? this.renderLogoutLink()
					: this.renderLoginLink()}
			</nav>
		);
	}
}
