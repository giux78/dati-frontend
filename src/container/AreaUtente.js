import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = state => ({
  appName: state.appName
});

class AreaUtente extends React.Component {
  render() {
    return (
      <div>
        <h2>Area Utente</h2>
      </div>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(AreaUtente);
