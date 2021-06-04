import { useState } from 'react';
import MusicSelection from './components/spotify/MusicSelection';
import connectSpotify from './api/connectSpotify';

const App = () => {
	const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

	const data = [
		{ value: 1, name: 'A' },
		{ value: 2, name: 'B' },
		{ value: 3, name: 'C' },
	];

	const [token, setToken] = useState('');

	connectSpotify('https://accounts.spotify.com/api/token', {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + btoa(`${REACT_APP_CLIENT_ID}:${REACT_APP_CLIENT_SECRET}`),
		},
		data: 'grant_type=client_credentials',
		method: 'POST',
	}).then((tokenResponse) => {
		setToken(tokenResponse.data.access_token);
	});






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
