import React from 'react';

import './clickablePreview.scss';
import ClickableHeader from './ClickableHeader'
import ClickableRow from './ClickableRow'
import PreviewForm from './PreviewForm'
import PreviewHint from './PreviewHint'

const ClickablePreview = (props) => {


  const sheet = props.Obj.sheets[0]

  return (

    <div className='excel-preview'>
      <PreviewHint />
      <table className="table">
        <thead>
            <ClickableHeader data={sheet.data} />
        </thead>

        <ClickableRow data={sheet.data} />

      </table>
      <PreviewForm data={sheet.data}/>
    </div>
  );
};

export default ClickablePreview;
