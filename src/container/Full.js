import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom'
import Sidebar from '../admin/components/Sidebar/';
import Breadcrumb from '../admin/components/Breadcrumb/';
import Dashboard from '../admin/views/Dashboard/'
import IngestionForm from '../admin/views/IngestionForm/'
import DatasetDetail from '../components/Dataset/DatasetDetail'
import { HeaderAuth } from '../components/HeaderFooter/HeaderAuth';
//import { HeaderAuth } from '../components/HeaderFooter/HeaderAuth';

const mapStateToProps = state => ({
  appName: state.appName
});


class Full extends React.Component {
  render() {
    return (
      <div data-reactroot className="app">
        <HeaderAuth />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path="/admin/dashboard" name="Dashboard" component={Dashboard} />
                <Route path="/admin/ingestionform" name="Forms" component={IngestionForm} />
                <Route path="/admin/datasetdetail/:name" name="DatasetDetail" component={DatasetDetail} />
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
            </div>
          </main>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, () => ({}))(Full);
