import React from 'react';


const MusicSelection = ({ options, selectedValue, onChange, label }) => {
	const genreChanged = (e) => {
		onChange(e.target.value);
	};

	return (
		<div className='col-sm-6 form-group row px-0'>
			<label className='form-label col-sm-2'>{label}</label>
			<select value={selectedValue} onChange={genreChanged} className='form-control form-control-sm col-sm-10'>
				<option key={0}>Select...</option>
				{options.map((item, idx) => (
					<option key={idx + 1} value={item.id}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default MusicSelection;
