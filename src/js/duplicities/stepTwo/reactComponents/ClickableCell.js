import React from 'react';
import './ClickableCell.scss'
import handlers from './../handlers/handlers'

const ClickableCell = (props) => {


	const rowArray = props.cell
	return (
		<tr>

			{rowArray.map((cell, index) => (
				<td 
					onMouseEnter={handlers.hoverEnterHandler}
					onMouseLeave={handlers.hoverLeaveHandler}
					onClick={handlers.markColumnHandler}
					key={index}
					column={index}
					className={`column-${index}`}>{cell}</td>
			))}
		</tr>


	);
};

export default ClickableCell;
