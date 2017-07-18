import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
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

  //Action creators don't dispatch anything to the store; 
  //instead they return action object that a 'central dispatch' uses (action.js) 
  handleLoadDatasetClick(e) {
    var query = this.refs.esplora;
    console.log('handleLoadDatasetClick');
    console.log('query: ' + query.value);
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(loadDatasets(selectDataset, query.value))
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
      <div>
        <div className="u-background-50 u-textCenter u-padding-top-xxl">
          <h2 className="u-layoutCenter u-text-r-l u-textWeight-300 u-color-white u-lineHeight-l">
            Scopri la bellezza e la ricchezza dei dati</h2>
          <p className="u-text-r-xs  u-color-10 u-layout-prose u-layoutCenter u-padding-r-left u-padding-r-right">
            Assumenda consequatur cupiditate mollitia ullam cupiditate similique.
                Quis excepturi fuga assumenda animi officiis eum delectus illo.
              </p>
        </div>
        <div className="u-background-50 newsletter-wrapper">
          <div className="Grid newsletter-background blue">
            <div className="Grid-cell u-size1of2 left u-background-60"></div>
            <div className="Grid-cell u-size1of2 right u-background-60"></div>
          </div>
          <div className="Grid newsletter-background grey">
            <div className="Grid-cell u-size9of12 left u-background-grey-15"></div>
            <div className="Grid-cell u-size3of12 right u-background-grey-15"></div>
          </div>
          <div className="u-textCenter u-padding-r-all u-textCenter">
            <form className="Form u-padding-r-top u-md-size7of12 u-lg-size5of12 u-layoutCenter">
              <div className="Form-field Form-field--withPlaceholder Grid u-background-white u-color-grey-30 u-borderRadius-s u-borderShadow-xxl">
                <button className="Grid-cell u-sizeFit Icon-search u-color-grey-40 u-text-r-m u-padding-all-s u-textWeight-400">
                </button>
                <input className="Form-input Form-input--ultraLean Grid-cell u-sizeFill u-text-r-s u-color-black u-text-r-xs u-borderHideFocus " required="" id="esplora" name="esplora" ref="esplora"/>
                <label className="Form-label u-color-grey-50 u-padding-left-xxl" htmlFor="esplora"><span className="u-hidden u-md-inline u-lg-inline">
                  cerca</span></label>
                <button type="submit" className="Grid-cell u-sizeFit u-background-60 u-color-white u-textWeight-600 u-padding-r-left u-padding-r-right u-textUppercase u-borderRadius-s" onClick={this.handleLoadDatasetClick}>Esplora</button>
              </div>
            </form>
            <div className="u-layoutCenter u-textCenter u-color-white">
              <ul className="u-textCenter u-layoutCenter u-padding-r-all u-margin-top">
                <li className="u-inlineBlock u-padding-right-xs u-padding-left-xs">
                  <a href="#" title="" className="u-padding-all-xxs u-color-50 u-inlineBlock u-borderRadius-circle u-alignMiddle u-textWeight-600">Categoria 1</a>
                </li>
                <li className="u-inlineBlock u-padding-right-xs u-padding-left-xs">
                  <a href="#" title="" className="u-padding-all-xxs u-color-50 u-inlineBlock u-borderRadius-circle u-alignMiddle u-textWeight-600">Categoria 2</a>
                </li>
                <li className="u-inlineBlock u-padding-right-xs u-padding-left-xs">
                  <a href="#" title="" className="u-padding-all-xxs u-color-50 u-inlineBlock u-borderRadius-circle u-alignMiddle u-textWeight-600">Categoria 3</a>
                </li>
              </ul>
            </div>
             <DatasetList datasets={datasets}/>
          </div>
        </div>
      </div>
    )
  }
}

Dataset.propTypes = {
  selectDataset: PropTypes.string,
  query: PropTypes.string,
  datasets: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectDataset, datasetReducer } = state
  const { isFetching, lastUpdated, items: datasets } = datasetReducer[selectDataset] 
     || { isFetching: true, items: [] }

  return {
    selectDataset,
    datasets,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Dataset)