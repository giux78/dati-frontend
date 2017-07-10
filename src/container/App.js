import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from './Home'
import HomePrivata from './HomePrivata'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import { Provider } from 'react-redux';
import configureStore from '../configureStore'
import DatasetDetail from '../components/Dataset/DatasetDetail'
import WizardContainer from './WizardContainer'

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
        : <Redirect to='/dashboard' />}
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
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Data Portal</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/" className="navbar-brand">Home</Link>
                </li>
                <li>
                {this.state.authed &&
                  <Link to="/dashboard" className="navbar-brand">Area Privata</Link> 
                }
                </li>
                <li>
                {this.state.authed &&
                  <Link to="/ingestion-wizard" className="navbar-brand">Ingestion</Link>
                }
                </li>
                <li>
                  {this.state.authed
                    ? <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand">Logout</button>
                    : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>
                      </span>}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <Route authed={this.state.authed} path='/login' component={Login} />
                <Route authed={this.state.authed} path='/register' component={Register} />
                <Route path="/datasetdetail/:name" component={DatasetDetail}/>
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={HomePrivata} />
                <PrivateRoute authed={this.state.authed} path='/ingestion-wizard' component={WizardContainer} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}
