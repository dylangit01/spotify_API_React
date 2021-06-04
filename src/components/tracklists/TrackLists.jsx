import React from 'react';

const TrackLists = ({ items, onChange }) => {
	const handleClick = (e) => {
		e.preventDefault();
		onChange(e.target.id);
	};
	return (
		<div className='col-sm-6 px-0'>
			<div className='list-group'>
				{items.map((item, idx) => (
					<button
						key={idx}
						onClick={handleClick}
						className='list-group-item list-group-item-action list-group-item-light'
						id={item.track.id}
					>
						{item.track.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default TrackLists;
