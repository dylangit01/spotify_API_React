import React, { useState } from 'react';


const MusicSelection = ({ options }) => {
	const [selectedValue, setSelectedValue] = useState('');

	return (
		<>
			<select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
				{options.map((item, idx) => (
					<option key={idx} value={item.value}>
						{item.name}
					</option>
				))}
			</select>
			<p>{selectedValue}</p>
		</>
	);
};

export default MusicSelection;
