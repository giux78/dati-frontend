import React from 'react';
import { connect } from 'react-redux';
import Dataset from './Dataset';
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../container/Login'
import Register from '../container/Register'
import DatasetDetail from '../components/Dataset/DatasetDetail'
import { FooterNoAuth } from '../components/HeaderFooter/FooterNoAuth';
import { HeaderNoAuth } from '../components/HeaderFooter/HeaderNoAuth';

const mapStateToProps = state => ({
  appName: state.appName
});

class Home extends React.Component {
  render() {
    return (
       <div data-reactroot className="app">
          <HeaderNoAuth />
          <Switch>
            <Route path='/' exact component={Dataset} />
            <Route path="/login" component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/datasetdetail/:name' component={DatasetDetail} />
          </Switch>
          <section className="u-nbfc u-background-grey-15  u-textCenter u-layout-r-withGutter u-padding-r-top u-padding-r-bottom u-posRelative u-zindex-30">
          <div className="u-layout-wide u-layoutCenter">
            <br /><br /><br /><br /><br /><br /><br />
          </div>
          </section>
          <FooterNoAuth />
      </div>
      );
  }
}


/*
<div data-reactroot className="app">
          <HeaderNoAuth />
          <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
          <div className="app-body">
          <Switch>
            <Route path='/' exact component={Dataset} />
            <Route path="/login" component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/datasetdetail/:name' component={DatasetDetail} />
          </Switch>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <FooterNoAuth />
      </div>
*/


//<Route path="/login" render={() => ( this.state.authed ? (<Redirect to="/admin/dashboard"/>) : (<Login/>))}/>

export default connect(mapStateToProps, () => ({}))(Home);
