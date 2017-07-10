import React from 'react';
import { Link } from 'react-router-dom'

const DatasetPreview = props => {
  const dataset = props.dataset;
  var linkTo = "/datasetdetail/name:" + dataset.name;

  return (
    <div className="form-group">
      <label>{dataset.title}</label><br/>
      <label>Creator: {dataset.creator_name}</label><br/>
      <label>Issued: {dataset.issued}</label><br/>
      <label>{dataset.resources[0].description}</label><br/>
    </div>
  );
}

export default DatasetPreview;