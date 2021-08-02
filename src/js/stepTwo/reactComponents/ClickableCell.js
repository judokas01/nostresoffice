import React from 'react';


const ClickableCell = (props) => {


const rowArray = props.cell
  return (
    <tr>
       
       {rowArray.map((cell, index ) => (
        <td key={index} className={`column-${index}`}>{cell}</td>
      ))}
         </tr> 

    
  );
};

export default ClickableCell;
