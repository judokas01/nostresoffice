import React from 'react';

import './ClickableCell.scss';
import handlers from './../handlers/handlers'

const ClickableHeader = (props) => {



  return (
    <tr>
       
       {props.data[0].map((header, index ) => (
        <td 
            onMouseEnter={handlers.hoverEnterHandler}
			onMouseLeave={handlers.hoverLeaveHandler}
			onClick={handlers.markColumnHandler}
			key={index}
			column={index}
			className={`column-${index}`}>{header}</td>
      ))}
         </tr> 

    
  );
};

export default ClickableHeader;
