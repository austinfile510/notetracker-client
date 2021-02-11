import { React, Component } from 'react';

export default class RegistrationPage extends Component {
	render() {
		return (
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
		);
	}
}
