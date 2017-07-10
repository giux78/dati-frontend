import React from 'react';
import { connect } from 'react-redux';
import Dataset from './Dataset';

const mapStateToProps = state => ({
  appName: state.appName
});

class Home extends React.Component {
  render() {
    return (
      <div>
         <Dataset/>
      </div>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(Home);
