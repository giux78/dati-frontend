import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadDatasets,
  unloadDatasets
} from '../actions'

class PrivateDataset extends Component {
  constructor(props) {
    super(props)
    this.handleLoadDatasetClick = this.handleLoadDatasetClick.bind(this)
    this.handleUnloadDatasetClick = this.handleUnloadDatasetClick.bind(this)
  }

  //Action creators don't dispatch anything to the store; 
  //instead they return action object that a 'central dispatch' uses (action.js) 
  handleLoadDatasetClick(e) {
    console.log('handleLoadDatasetClick');
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(loadDatasets(selectDataset))
  }

  handleUnloadDatasetClick(e) {
    console.log('handleUnloadDatasetClick');
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(unloadDatasets(selectDataset))
  }
 
  render() {
    const { datasets } = this.props
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Dataset </h1>
        <form>
          <div className="form-group">
            <label>Cerca tra i dati della pubblica amministrazione.</label>
            <input className="form-control" placeholder="Input"/>
          </div>
          <span>
            <button type="submit" onClick={this.handleLoadDatasetClick} className="btn btn-primary">Cerca</button>
          </span>
          <span>
            <button type="submit" onClick={this.handleUnloadDatasetClick} className="btn btn-primary">Pulisci</button>
          </span>
        </form>
      </div>
    )
  }
}

PrivateDataset.propTypes = {
  selectDataset: PropTypes.string,
  datasets: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectDataset, datasetReducer } = state
  const { isFetching, lastUpdated, items: datasets } = datasetReducer[selectDataset] 
     || {isFetching: true, items: [] }

  return {
    selectDataset,
    datasets,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(PrivateDataset)