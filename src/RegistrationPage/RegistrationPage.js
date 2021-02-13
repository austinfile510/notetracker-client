import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import ApiContext from '../contexts/ApiContext';
import Header from '../Header/Header';

export default class RegistrationPage extends Component {
	static contextType = ApiContext;

	state = {
		error: null,
	};

	handleRegister = (e) => {
		e.preventDefault();
		const registerInfo = {
			full_name: e.target['full_name'].value,
			user_name: e.target['user_name'].value,
			password: e.target['password'].value,
			email: e.target['email'].value,
		};
		AuthApiService.postUser(registerInfo)
			.then(() => {
				this.props.history.push('/login');
			})
			.catch((e) => {
				console.log(e);
				this.setState({ error: e.error });
			});
	};

	render() {
		return (
			<div>
				<Header />
				<h2>Registration</h2>
				<form
					name='registration-form'
					className='registration-form__container'
					onSubmit={this.handleRegister}
				>
					<label>Full Name:</label>
					<input name='full_name' required type='text' />
					<br />
					<label>Username:</label>
					<input required type='text' name='user_name' />
					<br />
					<label>Password:</label>
					<input required type='password' name='password' />
					<br />
					<label>Email Address:</label>
					<input required type='email' name='email' />
					<br />
					<button>Register</button>
				</form>
				<p className='red'>{this.state.error}</p>
				<p className='shadow'>
					Already registered?{' '}
					<Link to={'/login'} style={{}}>
						Log in here!
					</Link>
				</p>
			</div>
		);
	}
}
