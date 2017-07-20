import React, { PropTypes, Component }from 'react';    		 
import fetch from 'isomorphic-fetch';              		             		
import det from '../../data/datasetdetail';
import DatasetInfo from './DatasetInfo';
import { datasetDetail } from '../../actions'
import { connect } from 'react-redux'

class DatasetDetail extends Component { 
/*  static propTypes = {         
    params: PropTypes.shape({  
      name: PropTypes.string,  
    }),                        
  }
*/ 
  constructor(props) { 
      super(props);               
  } 
 
  /*
  componentDidMount(){    	 
      console.log('componentDidMount');
      console.log('fetch dataset with name: ' + this.props.match.params.name);
      console.log('MODE: ' + process.env.NODE_ENV) 
      if (process.env.NODE_ENV == 'development') {
        this.setState({
          dataset: det,
        })
      }
      else {
        fetch('http://localhost:9000/dati-gov/v1/ckan/datasets/${this.props.params.post}')
          .then(res => res.json())
          .then(dataset => this.setState({ dataset }));
      }
  } 
 componentDidMount(){   
    console.log('componentDidMount');
    const { dispatch, selectDataset } = this.props
    dispatch(datasetDetail(selectDataset, this.props.match.params.name))
 }*/

  render() { 
    const { dataset } = this.props
    return ( 
    dataset &&      
        <div className="col-sm-6 col-sm-offset-3">
        <h1> Dettaglio dataset  </h1>
        <form>
          <div className="form-group">
            <label>Informazioni dataset {this.props.match.params.name}</label>
          </div>
          <DatasetInfo dataset={dataset}/>
        </form>
      </div>
    ); 
  } 
} 

DatasetDetail.propTypes = {
  selectDataset: PropTypes.string,
  dataset: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  lastUpdated: PropTypes.number
}


const mapStateToProps = state => ({
  dataset: state.dataset
});

export default connect(mapStateToProps)(DatasetDetail)
