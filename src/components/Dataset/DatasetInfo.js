import React from 'react';

const DatasetPreview = props => {
  const dataset = props.dataset;

  return (
    dataset ? 
    <div className="form-group">
      <label>{dataset.title}</label><br/>
      <label>Creator: {dataset.creator_name}</label><br/>
      <label>Issued: {dataset.issued}</label><br/>
    </div>
    :
    <div className="form-group">
      no detail  
    </div>
  );
}

export default DatasetPreview;