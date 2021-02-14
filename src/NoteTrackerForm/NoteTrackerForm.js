import React from 'react';

export default function NoteTrackerForm(props) {
	const { className, ...otherProps } = props;
	return (
		<form
			className={['NoteTracker-form', className].join(' ')}
			action='#'
			{...otherProps}
		/>
	);
}
