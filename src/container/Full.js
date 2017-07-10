import React from 'react';
import { connect } from 'react-redux';
import Dataset from './Dataset';

const mapStateToProps = state => ({
  appName: state.appName
});

class Full extends React.Component {
  render() {
    return (
      <div>
         <h2>Full</h2>
      </div>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(Full);
