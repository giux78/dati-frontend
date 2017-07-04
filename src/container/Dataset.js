import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
  loadDatasets,
  unloadDatasets
} from '../actions'
import DatasetList from '../components/Dataset/DatasetList'

class Dataset extends Component {
  constructor(props) {
    super(props)
    this.handleLoadDatasetClick = this.handleLoadDatasetClick.bind(this)
    this.handleUnloadDatasetClick = this.handleUnloadDatasetClick.bind(this)
  }

  handleLoadDatasetClick(e) {
    console.log('handleLoadDatasetClick');
    e.preventDefault()
    const { dispatch, selectedSubreddit } = this.props
    dispatch(loadDatasets(selectedSubreddit))
  }

  handleUnloadDatasetClick(e) {
    console.log('handleUnloadDatasetClick');
    e.preventDefault()
    const { dispatch, selectedSubreddit } = this.props
    dispatch(unloadDatasets(selectedSubreddit))
  }
 
  render() {
    const { selectedSubreddit, datasets, isFetching, lastUpdated } = this.props
    return (
      <div>
        <p>
            
        </p>
        <p>
            <input />
            <button onClick={this.handleLoadDatasetClick}>Cerca</button>
            <button onClick={this.handleUnloadDatasetClick}>Pulisci</button>
        </p>
        
        <div>
          <DatasetList datasets={datasets}/>
        </div> 
      </div>
    )
  }
}

Dataset.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  datasets: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: datasets
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    datasets,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Dataset)