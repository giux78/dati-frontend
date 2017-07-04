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
    /*fetch(`${process.env.ENDPOINT}/posts/${this.props.params.post}`) 
      .then(res => res.json()) 	 
      .then(post => this.setState({post})); */
      console.log('componentDidMount');
      console.log('fetch dataset with name: ');
      console.log({});
      this.setState({           
        dataset: det,            
      }               
    )     
  } 
 
  render() { 
    return ( 
    this.state.dataset &&      
        <div className="container‐fluid"> 
          <div className="row"> 
            <div className="col‐xs‐12 col‐sm‐6 col‐sm‐offset‐3"> 
              <p>Informazioni dataset {this.props.match.params.name}</p>
              <DatasetInfo dataset={this.state.dataset}/>
            </div> 
          </div> 
        </div> 
    ); 
  } 
} 

export default DatasetDetail