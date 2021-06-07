import React, { useState, useEffect } from 'react';
import MusicSelection from './components/Spotify/MusicSelection';
import axios from 'axios';
import TrackLists from './components/Tracklists/TrackLists';
import SongDetail from './components/SongDetail/SongDetails';

const App = () => {
	const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
	const baseURL = 'https://accounts.spotify.com/api/token';
	const genresURL = 'https://api.spotify.com/v1/browse/categories?locale=sv_US';

	const [token, setToken] = useState('');
	const [genres, setGenres] = useState({ selectedGenre: '', listOfGenres: [] });
	const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylist: [] });
	const [tracks, setTracks] = useState({ selectedTrack: '', listOfTracks: [] });
	const [trackDetail, setTrackDetail] = useState(null);

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

	const genreChanged = async (val) => {
		console.log(val);
		setGenres({
			selectedGenre: val,
			listOfGenres: genres.listOfGenres,
		});

		const playlistResponse = await axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + token },
		});
		console.log(playlistResponse);
		setPlaylist({
			selectedPlaylist: playlist.selectedPlaylist,
			listOfPlaylist: playlistResponse.data.playlists.items,
		});
	};

	const playlistChanged = (val) => {
		setPlaylist({
			selectedPlaylist: val,
			listOfPlaylist: playlist.listOfPlaylist,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const tracksResponse = await axios(
			`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`,
			{
				method: 'GET',
				headers: { Authorization: 'Bearer ' + token },
			}
		);
		setTracks({
			selectedTrack: tracks.selectedTrack,
			listOfTracks: tracksResponse.data.items,
		});
	};

	const trackBtnClicked = (val) => {
		const currentTracks = [...tracks.listOfTracks];
		const trackInfo = currentTracks.filter((t) => t.track.id === val);
		setTrackDetail(trackInfo[0].track);
	};

	return (
		<div className='container mt-3'>
			<form onSubmit={handleSubmit}>
				<MusicSelection
					label='Genre:'
					options={genres.listOfGenres}
					selectedValue={genres.selectedGenre}
					onChange={genreChanged}
				/>
				<MusicSelection
					label='Playlist:'
					options={playlist.listOfPlaylist}
					selectedValue={playlist.selectedPlaylist}
					onChange={playlistChanged}
				/>
				<div className="col-sm-6 row form-group px-3">
					<button className="btn btn-outline-primary" type="submit">Search</button>
				</div>
				<div className="row">
					<TrackLists items={tracks.listOfTracks} onChange={trackBtnClicked} />
					{console.log(trackDetail)}
				{trackDetail && <SongDetail {...trackDetail} />}
				</div>
			</form>
		</div>
	);
};

export default App;
