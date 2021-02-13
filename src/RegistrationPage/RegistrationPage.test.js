import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import { BrowserRouter } from 'react-router-dom';

describe('Registration Page component', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<BrowserRouter>
				<RegistrationPage />
			</BrowserRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});
});
