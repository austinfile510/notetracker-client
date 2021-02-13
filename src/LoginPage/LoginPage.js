import { React, Component } from 'react';
import ApiContext from '../contexts/ApiContext';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
import NoteTrackerApiService from '../services/notetracker-api-service';
import AuthApiService from '../services/auth-api-service';
import Header from '../Header/Header';

export default class LoginPage extends Component {
	static contextType = ApiContext;

	state = {
		error: null,
	};

	handleLogin = (e) => {
		e.preventDefault();
		const loginCredentials = {
			user_name: e.target['user_name'].value,
			password: e.target['password'].value,
		};
		AuthApiService.postLogin(loginCredentials)
			.then(() => {
				this.context.setUser(TokenService.readJwtToken());
				this.props.history.push('/tasks');
			})
			.catch((e) => {
				console.log(e);
				this.setState({ error: e.error });
			});
	};


	render() {
		return (
			<div name='login-main' className='LoginPage__container'>
				<Header />
				<h2 className='shadow'>User Login</h2>
				<main>
					<form
						name='login-form'
						className='login-form__container'
						onSubmit={this.handleLogin}
					>
						<label>
							Username: <input required type='text' name='user_name' />
						</label>
						<br />
						<label>
							Password: <input required type='password' name='password' />
							<br />
							<button>Submit</button>
						</label>
					</form>
					<p className='red'>{this.state.error}</p>
				</main>
			</div>
		);
	}
}
