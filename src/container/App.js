import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import Login from '../container/Login'
import Register from '../container/Register'
import Home from './Home'
import Full from './Full'
import { firebaseAuth } from '../config/constants'
import { Provider } from 'react-redux';
import configureStore from '../configureStore'
//import { FooterNoAuth } from '../components/HeaderFooter/FooterNoAuth';
//import { HeaderAuth } from '../components/HeaderFooter/HeaderAuth';
//import { HeaderNoAuth } from '../components/HeaderFooter/HeaderNoAuth';

const store = configureStore();

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/admin/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PublicRoute authed={this.state.authed} path='/' exact component={Home} />
          <PublicRoute authed={this.state.authed} path="/login" component={Home} />
          <PublicRoute authed={this.state.authed} path='/register' component={Home} />
          <PublicRoute authed={this.state.authed} path='/datasetdetail/:name' component={Home} />
          <PrivateRoute authed={this.state.authed} path='/admin/dashboard' component={Full} />
          <PrivateRoute authed={this.state.authed} path='/admin/ingestionform' component={Full} />
          <PrivateRoute authed={this.state.authed} path='/admin/ingestionwizzard' component={Full} />
          <PrivateRoute authed={this.state.authed} path="/admin/datasetdetail/:name" component={Full}/>
          <PrivateRoute authed={this.state.authed} path="/admin/ontologies" component={Full}/>
          <PrivateRoute authed={this.state.authed} path="/admin/dash" component={Full}/>
          <Route render={() => <h3>Pagina non trovata</h3>} />
        </Switch>
      </BrowserRouter>
      </Provider>
    );
  }
}
