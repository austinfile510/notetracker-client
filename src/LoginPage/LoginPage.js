import { React, Component } from 'react';

export default class LoginPage extends Component {
	render() {
		return (
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
		);
	}
}
