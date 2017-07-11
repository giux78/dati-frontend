import React from 'react';
import { connect } from 'react-redux';
import Dataset from './Dataset';
import { Link, Switch, Route, Redirect } from 'react-router-dom'

import Header from '../admin/components/Header/';
import Sidebar from '../admin/components/Sidebar/';
import Breadcrumb from '../admin/components/Breadcrumb/';
import Aside from '../admin/components/Aside/';
import Footer from '../admin/components/Footer/';

import Dashboard from '../admin/views/Dashboard/'
import Forms from '../admin/views/Carica/Forms/'
import IngestionForm from '../admin/views/IngestionForm/'

const mapStateToProps = state => ({
  appName: state.appName
});


class Full extends React.Component {
  render() {
    return (
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path="/admin/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/admin/ingestionform" name="Forms" component={IngestionForm}/>
                <Redirect from="/admin" to="/admin/dashboard"/>
              </Switch>
            </div>
          </main>
        </div>
    );
  }
}


export default connect(mapStateToProps, () => ({}))(Full);
