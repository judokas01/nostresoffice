import React from 'react';

import './ClickablePreview.scss';
import ClickableHeader from './ClickableHeader'
import ClickableRow from './ClickableRow'
import PreviewForm from './PreviewForm'
import PreviewHint from './PreviewHint'

const ClickablePreview = (props) => {


  const sheet = props.Obj.sheets[0]

  return (

    <div className='excel-preview'>
      <PreviewHint />
      <div className="table-preview">
      <table className="table">
        <thead>
            <ClickableHeader data={sheet.data} />
        </thead>

        <ClickableRow data={sheet.data} />

      </table>
      </div>
      <PreviewForm data={sheet.data}/>
    </div>
  );
};

export default ClickablePreview;
