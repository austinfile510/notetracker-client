import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../contexts/ApiContext';
import Header from '../Header/Header';
import '../index.css';

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
						NoteTracker is designed with a user-first experience in mind. Keep
						track of what's important to you. Add and search for important
						information you need to keep on hand. Never miss another deadline!
					</p>
					<Link to='/register'>
						<h3>Getting Started</h3>
					</Link>
					<p>
						To get started using NoteTracker, simply sign up for an account by
						clicking the link above and get started using the platform today!.
					</p>
					<p>
						NoteTracker's ingenuity is in its searchable notes feature. It's
						hard keeping track of a password you wrote down 3 months ago on a
						scrap of paper. With NoteTracker, you can have that kind of
						information within easy reach, and keep yourself better organized
						for it!
					</p>
					<p>
						Take advantage of NoteTracker's search system, which lets you search
						by an individual task. Never lose track of your notes again!
					</p>
				</main>
			</div>
		);
	}
}
