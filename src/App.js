import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import TasksPage from './TasksPage/TasksPage';
import AddToDoList from './AddToDoList/AddToDoList';
import AddTask from './AddTask/AddTask';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import { ApiProvider } from './contexts/ApiContext';
import Home from './Home/Home';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import LoginPage from './LoginPage/LoginPage';

import TokenService from './services/token-service';
import AuthApiService from './services/auth-api-service';
import Task from './Task/Task';

export default class App extends Component {
	state = {
		tasks: [],
		toDoLists: [],
		hasError: false,
	};

	static getDerivedStateFromError(error) {
		console.error(error);
		return { hasError: true };
	}

	deleteBookmark = (bookmarkId) => {
		const newBookmarks = this.state.bookmarks.filter(
			(bm) => bm.id !== bookmarkId
		);
		this.setState({
			bookmarks: newBookmarks,
		});
	};

	componentDidMount() {
		/*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */

		/* if a user is logged in */
		if (TokenService.hasAuthToken()) {
			/*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */

			/*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
			TokenService.queueCallbackBeforeExpiry(() => {
				/* the timoue will call this callback just before the token expires */
				AuthApiService.postRefreshToken();
			});
		}
	}

	componentWillUnmount() {
		/*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */

		/*
      and remove the refresh endpoint request
    */
		TokenService.clearCallbackBeforeExpiry();
	}

	logoutFromIdle = () => {
		/* remove the token from localStorage */
		TokenService.clearAuthToken();
		/* remove any queued calls to the refresh endpoint */
		TokenService.clearCallbackBeforeExpiry();
		/* remove the timeouts that auto logout when idle */

		/*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
		this.forceUpdate();
	};


	renderMainRoutes() {
		return (
			<Switch>
				{/* {['/todo/:toDoListId'].map((path) => (
					<Route exact key={path} path={path} component={ToDoListPage} />
				))} */}
				<Route exact path='/' component={Home} />
				<Route path='/tasks/:task_id' component={Task} />
				<Route exact path='/tasks' component={TasksPage} />
				<Route path='/add-to-do-list' component={AddToDoList} />
				<Route path='/add-task' component={AddTask} />
				<Route path='/login' component={LoginPage} />
				<Route path='/register' component={RegistrationPage} />
				<Route component={NotFoundPage} />
			</Switch>
		);
	}

	render() {
		return (
			<ApiProvider>
				<div className='App'>
					<main className='App__main'>{this.renderMainRoutes()}</main>
				</div>
			</ApiProvider>
		);
	}
}
