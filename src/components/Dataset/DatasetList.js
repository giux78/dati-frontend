import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import {
  datasetDetail
} from '../../actions'

class DatasetList extends Component {
  constructor(props) {
    super(props)
    this.handleLoadDatasetDetailClick = this.handleLoadDatasetDetailClick.bind(this)
  }

  handleLoadDatasetDetailClick(e){
    console.log('handleLoadDatasetDetailClick');
    const { dispatch, selectDataset } = this.props
    dispatch(datasetDetail(selectDataset, 'test-dcatapit-api-1'))
  }


  renderDataset(datasets){
    return datasets.map(dataset => {
        return(
            <li key={dataset.name}>
              <form>
              <div>
                <h3>{dataset.name}</h3>
                <button type="submit" onClick={this.handleLoadDatasetDetailClick}>Dettaglio</button>
              </div>
            </form>
            </li>
        );
    });
  }

 render() {
    const { datasets} = this.props
    return (
      <div>
          <ul className="list-group">
            {this.renderDataset(datasets)}
          </ul>
        </div>
    
    )
  }
}

export default DatasetList;
