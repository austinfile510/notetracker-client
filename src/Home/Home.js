import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../contexts/ApiContext';
import Header from '../Header/Header'

export default class Home extends Component {
	static contextType = ApiContext;

	// componentDidMount() {
	//     this.context.clearError()
	//         .catch(this.context.setError);

	// }

	render() {
		return (
			<div name='home-page-container' className='HomePage__container'>
            <Header />
				<main name='main'>
					<h2>Welcome to NoteTracker!</h2>
					<p>
						NoteTracker is designed with a user-first experience in mind. Keep track of what's
						important to you. Add and remove tasks easily. Never miss another
						deadline!
					</p>

					<h3>Getting Started</h3>

					<p>
						To get started using NoteTracker, simply <Link to='/register'>sign up</Link> for an account and get started using the platform today!.
					</p>
				
				</main>
			</div>
		);
	}
}
