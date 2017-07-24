import React, { Component } from 'react';
import PrivateDataset from '../../../container/PrivateDataset';
import Autocomplete from '../../../components/Dataset/Autocomplete.js';
import { getOntologies } from '../../../actions'
import ontologiesFile from '../../../data/ontologies.js';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ontologies: []
    };  
  }
  
  componentDidMount() {    
    var that = this;
    var url = 'http://stlab.istc.cnr.it/ontonethub/api/find?name=a'

    if(process.env.NODE_ENV=='development'){
      that.setState({ ontologies: ontologiesFile });
    }else {

    fetch(url, {
      //credentials: 'include', //pass cookies, for authentication
      method: 'post',
      headers: {
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    })
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      that.setState({ ontologies: data.results });
    });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <h1>Ontologies</h1>
        <Autocomplete ref="auto" categories={this.state.ontologies} filterType={'2'}/>
      </div>
    )
  }
}

export default Dashboard;
