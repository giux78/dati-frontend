import React from 'react';
import { Link } from 'react-router-dom'
import DatasetInfo from './DatasetInfo';

const DatasetDetail = props => {
  if (!props.dataset) {
    return (
      <div>No dataset detail </div>
    );
  }

  return (
    props.dataset &&      
        <div className="col-sm-6 col-sm-offset-3">
        <h1> Dettaglio dataset  </h1>
        <form>
          <div className="form-group">
            <label>Informazioni dataset {}</label>
          </div>
          <DatasetInfo dataset={props.dataset}/>
        </form>
      </div>
  );
};

export default DatasetDetail;
