import TokenService from '../services/token-service';
import config from '../config';

const NoteTrackerApiService = {
	getLists() {
		// Displays all tasks and lists by default
		return fetch(`${config.API_ENDPOINT}/to-do-lists`, {
			headers: {
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

    getTasksList() {
        return fetch(`${config.API_ENDPOINT}/tasks`, {
			headers: {
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
    },

	getTaskById(task_id) {
		return fetch(`${config.API_ENDPOINT}/tasks/${task_id}`, {
			headers: {
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	addTask(newTask) {
		return fetch(`${config.API_ENDPOINT}/tasks`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(newTask),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	markTask(task_id) {
		// Changes a task from complete to incomplete or vice versa
		return fetch(`${config.API_ENDPOINT}/tasks/${task_id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	deleteTask(task_id) {
		return fetch(`${config.API_ENDPOINT}/tasks/${task_id}`, {
			method: 'DELETE',
			headers: {
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		});
	},

	getListById(list_id) {
		return fetch(`${config.API_ENDPOINT}/to-do-lists/${list_id}`, {
			headers: {
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	addList(newList) {
		return fetch(`${config.API_ENDPOINT}/to-do-lists`, {
			method: 'POST',

			headers: {
                'content-type': 'application/json',
				Authorization: `Bearer ${TokenService.getAuthToken()}`,
			},
            body: JSON.stringify(newList),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	deleteList(list_id) {
		return fetch(`${config.API_ENDPOINT}/to-do-lists/${list_id}`, {
			method: 'DELETE',
			headers: {
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		});
	},
};

export default NoteTrackerApiService;
