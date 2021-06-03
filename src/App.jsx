import SpotifyAPI from './components/spotify/SpotifyAPI';

const App = () => {
	const data = [
			{ value: 1, name: 'A' },
			{ value: 2, name: 'B' },
			{ value: 3, name: 'C' },
		];

	return (
		<form onSubmit={()=> {}}>
			<div className="container">
				<SpotifyAPI options={data} />
				<SpotifyAPI options={data} />
				<button type='submit'>
					Search
				</button>
			</div>
			
		</form>
	);
}
 
export default App;