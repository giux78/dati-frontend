import React from 'react';
import { connect } from 'react-redux';
import Dataset from './Dataset';

const mapStateToProps = state => ({
  appName: state.appName
});

class Home extends React.Component {
  render() {
    return (
         <Dataset/>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(Home);
