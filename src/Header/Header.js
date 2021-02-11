import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Hyph } from '../Utils/Utils';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';


export default class Header extends Component {
	handleLogoutClick = () => {
		TokenService.clearAuthToken();
		/* when logging out, clear the callbacks to the refresh api and idle auto logout */
		TokenService.clearCallbackBeforeExpiry();
		IdleService.unRegisterIdleResets();
	};

	renderLogoutLink() {
		return (
			<div className='Header__logged-in'>
				<Link onClick={this.handleLogoutClick} to='/'>
					Logout
				</Link>
			</div>
		);
	}

	renderLoginLink() {
		return (
			<div className='Header__not-logged-in'>
				<Link to='/register'>Register</Link>
				<Hyph />
				<Link to='/login'>Log in</Link>
        <Hyph />
        <Link to='/add-to-do-list'>Create To-Do List</Link>
        <Hyph />
        <Link to='/add-task'>Create Task</Link>

			</div>
		);
	}

	render() {
		return (
			<nav className='Header'>
				<h1>
					<Link to='/'>NoteTracker</Link>
				</h1>
				{TokenService.hasAuthToken()
					? this.renderLogoutLink()
					: this.renderLoginLink()}
			</nav>
		);
	}
}
