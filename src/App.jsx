import React, { useState, useEffect } from 'react';
import MusicSelection from './components/spotify/MusicSelection';
import axios from 'axios'

const App = () => {
	const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

	const data = [
		{ value: 1, name: 'A' },
		{ value: 2, name: 'B' },
		{ value: 3, name: 'C' },
	];

	const [token, setToken] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios('https://accounts.spotify.com/api/token', {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Basic ' + btoa(`${REACT_APP_CLIENT_ID}:${REACT_APP_CLIENT_SECRET}`),
				},
				data: 'grant_type=client_credentials',
				method: 'POST',
			});
			console.log(response.data.access_token);
		};
		fetchData();
	}, []);

	return (
		<form onSubmit={() => {}}>
			<div className='container'>
				<MusicSelection options={data} />
				<MusicSelection options={data} />
				<button type='submit'>Search</button>
			</div>
		</form>
	);
};

export default App;
