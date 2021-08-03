import React from 'react';

import './ClickableHeader.scss';
import handlers from './handlers'

const ClickableHeader = (props) => {



  return (
    <tr>
       
       {props.data[0].map((header, index ) => (
        <td onMouseEnter={handlers.hoverEnterHandler} onMouseLeave={handlers.hoverLeaveHandler} onClick={handlers.markColumnHandler} key={index} className={`column-${index}`}>{header}</td>
      ))}
         </tr> 

    
  );
};

export default ClickableHeader;
