import React, { useState, useEffect } from 'react';
import MusicSelection from './components/spotify/MusicSelection';
import axios from 'axios';

const App = () => {
	const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
	const baseURL = 'https://accounts.spotify.com/api/token';
	const genresURL = 'https://api.spotify.com/v1/browse/categories?locale=sv_US';

	const data = [
		{ value: 1, name: 'A' },
		{ value: 2, name: 'B' },
		{ value: 3, name: 'C' },
	];

	const [token, setToken] = useState('');
	const [genres, setGenres] = useState({ selectedGenre: '', listOfGenres: [] });

	useEffect(() => {
		const fetchData = async () => {
			const tokenResponse = await axios(`${baseURL}`, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Basic ' + btoa(`${REACT_APP_CLIENT_ID}:${REACT_APP_CLIENT_SECRET}`),
				},
				data: 'grant_type=client_credentials',
				method: 'POST',
			});
			setToken(tokenResponse.data.access_token);

			const genreResponse = await axios(`${genresURL}`, {
				method: 'GET',
				headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` },
			});

			setGenres({
				selectedGenre: genres.selectedGenre,
				listOfGenres: genreResponse.data.categories.items,
			});
		};
		fetchData();
	}, [genres.selectedGenre, REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET]);

	return (
		<form onSubmit={() => {}}>
			<div className='container'>
				<MusicSelection options={genres.listOfGenres} selectedGenre={genres.selectedGenre} onChange={() => {}} />
				<MusicSelection options={data} />
				<button type='submit'>Search</button>
			</div>
		</form>
	);
};

export default App;
