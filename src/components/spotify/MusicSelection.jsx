import React from 'react';


const MusicSelection = ({ options, selectedValue, onChange }) => {
	const genreChanged = (e) => {
		onChange(e.target.value);
	};

	return (
		<>
			<select value={selectedValue} onChange={genreChanged}>
				{options.map((item, idx) => (
					<option key={idx} value={item.id}>
						{item.name}
					</option>
				))}
			</select>
		</>
	);
};

export default MusicSelection;
