import React, { PropTypes, Component }from 'react';    		 
import fetch from 'isomorphic-fetch';              		             		
import det from '../../data/datasetdetail';
import DatasetInfo from './DatasetInfo';
 
class DatasetDetail extends Component { 
  static propTypes = {         
    params: PropTypes.shape({  
      name: PropTypes.string,  
    }),                        
  } 
  constructor(props) { 
      super(props); 
      this.state = {           
        dataset: null,            
    };                         
  } 
 
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
 
  render() { 
    return ( 
    this.state.dataset &&      
        <div className="col-sm-6 col-sm-offset-3">
        <h1> Dettaglio dataset  </h1>
        <form>
          <div className="form-group">
            <label>Informazioni dataset {this.props.match.params.name}</label>
          </div>
          <DatasetInfo dataset={this.state.dataset}/>
        </form>
      </div>
    ); 
  } 
} 

export default DatasetDetail