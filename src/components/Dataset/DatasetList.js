import React from 'react';
import { Link } from 'react-router-dom'

const DatasetList = props => {
  if (!props.datasets) {
    return (
      <div></div>
    );
  }

  if (props.datasets.length === 0) {
    return (
      <div></div>
    );
  }

  function renderDataset(datasets){
    return datasets.map(dataset => {
        return(
            <li key={dataset.name}>
              <Link to={'datasetdetail/' + dataset.name}><h3>{dataset.title}</h3></Link>
            </li>
        );
    });
  }

  return (
    <div>
      <ul className="list-group">
        {renderDataset(props.datasets)}
      </ul>
    </div>
  );
};

export default DatasetList;
