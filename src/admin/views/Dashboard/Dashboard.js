import React, { Component } from 'react';
import Dataset from '../../../container/Dataset';

class Dashboard extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Dataset />
      </div>
    )
  }
}

export default Dashboard;
