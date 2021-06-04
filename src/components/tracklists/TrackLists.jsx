import React from 'react';

const TrackLists = ({ items, onChange }) => {
	const handleClick = (e) => {
		e.preventDefault();
		console.log(e.target);
		onChange(e.target.id)
	};
	return (
		<>
			{items.map((item, idx) => (
				<button key={idx} onClick={handleClick} id={item.track.id}>
					{item.track.name}
				</button>
			))}
		</>
	);
};

export default TrackLists;
