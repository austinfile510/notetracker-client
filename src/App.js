import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import ToDoListNav from './ToDoListNav/ToDoListNav';
import TaskPageNav from './TaskPageNav/TaskPageNav';
import ToDoListPage from './ToDoListPage/ToDoListPage';
import TaskPage from './TaskPage/TaskPage';
import AddToDoList from './AddToDoList/AddToDoList';
import AddTask from './AddTask/AddTask';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import ApiContext from './contexts/ApiContext';
import Home from './Home/Home';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import LoginPage from './LoginPage/LoginPage';
import IdleService from './services/idle-service';
import TokenService from './services/token-service';
import AuthApiService from './services/auth-api-service';
import Header from './Header/Header';

// import Home from './Home;'

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

	componentDidMount() {
		/*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
		IdleService.setIdleCallback(this.logoutFromIdle);

		/* if a user is logged in */
		if (TokenService.hasAuthToken()) {
			/*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
			IdleService.regiserIdleTimerResets();

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
		IdleService.unRegisterIdleResets();
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
		IdleService.unRegisterIdleResets();
		/*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
		this.forceUpdate();
	};

	// renderNavRoutes() {
	// 	return (
	// 		<>
	// 			{['/', '/todo/:toDoListId'].map((path) => (
	// 				<Route exact key={path} path={path} component={ToDoListNav} />
	// 			))}
	// 			<Route path='/tasks/:taskId' component={TaskPageNav} />
	// 			<Route path='/add-to-do-list' component={TaskPageNav} />
	// 			<Route path='/add-task' component={TaskPageNav} />
	// 		</>
	// 	);
	// }

	renderMainRoutes() {
		return (
			<Switch>
				{/* {['/todo/:toDoListId'].map((path) => (
					<Route exact key={path} path={path} component={ToDoListPage} />
				))} */}
				<Route exact path='/' component={Home} />
				<Route path='/tasks/:taskId' component={TaskPage} />
				<Route path='/add-to-do-list' component={AddToDoList} />
				<Route path='/add-task' component={AddTask} />
				<Route path='/login' component={LoginPage} />
				<Route path='/register' component={RegistrationPage} />
				<Route component={NotFoundPage} />
			</Switch>
		);
	}

	render() {
		const value = {
			tasks: this.state.tasks,
			toDoLists: this.state.toDoLists,
			addToDoList: this.handleAddToDoList,
			addTask: this.handleAddTask,
			deleteTask: this.handleDeleteTask,
		};
		return (
			<ApiContext.Provider value={value}>
				<div className='App'>
					<Header />
					<main className='App__main'>{this.renderMainRoutes()}</main>
				</div>
			</ApiContext.Provider>
		);
	}
}
