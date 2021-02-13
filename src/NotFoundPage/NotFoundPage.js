import React, { Component } from 'react';
import { Section } from '../Utils/Utils';

export default class NotFoundPage extends Component {
	render() {
		return (
			<Section className='NotFoundPage shadow'>
				<h2>404 - Page not found</h2>
				<p>Try going back to your previous page.</p>
			</Section>
		);
	}
}
