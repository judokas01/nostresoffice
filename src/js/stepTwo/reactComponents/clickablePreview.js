import React from 'react';

import './clickablePreview.scss';
import ClickableHeader from './ClickableHeader'
import ClickableRow from './ClickableRow'

const ClickablePreview = (props) => {


  const sheet = props.Obj.sheets[0]

  return (

    <div className='expense-date'>
      <table>
        <thead>
            <ClickableHeader data={sheet.data} />
        </thead>

        <ClickableRow data={sheet.data} />

      </table>
    </div>
  );
};

export default ClickablePreview;
