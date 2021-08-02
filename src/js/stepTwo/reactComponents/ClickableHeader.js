import React from 'react';

import './ClickableHeader.scss';

const ClickableHeader = (props) => {

  return (
    <tr>
       
       {props.data[0].map((header, index ) => (
        <td key={index} className={`column-${index}`}>{header}</td>
      ))}
         </tr> 

    
  );
};

export default ClickableHeader;
