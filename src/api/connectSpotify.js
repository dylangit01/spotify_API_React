import axios from 'axios';

export default axios.create({
	baseURL: 'https://accounts.spotify.com/api/token', // Don't put "/" afterwards
});
