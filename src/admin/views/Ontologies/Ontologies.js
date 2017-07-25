import React, { Component } from 'react';
import PrivateDataset from '../../../container/PrivateDataset';
import AutocompleteOntologies from '../../../components/Dataset/AutocompleteOntologies.js';
import { getOntologies } from '../../../actions'
import ontologiesFile from '../../../data/ontologies.js';

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <h1>Ontologies</h1>
        <AutocompleteOntologies ref="auto"/>
      </div>
    )
  }
}

export default Dashboard;
