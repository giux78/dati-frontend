import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import WizardContainer from './WizardContainer'
import IngestionForm from './IngestionForm'
import DatasetDetail from '../components/Dataset/DatasetDetail'
import Dataset from './Dataset'
import Home from './Home'
import Login from './Login'
import AreaUtente from './AreaUtente'
import MegaHeader from '../components/MegaHeader/MegaHeader'
import configureStore from '../configureStore'
import { Provider } from 'react-redux';
import { firebase } from '../backend/core';  
import { history } from '../history'; 
import Navigation from './Nav'

const store = configureStore();

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

const App = (state) => (
  <Provider store={store}>
  <Router {...state}>
    <div>
      <MegaHeader/>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/ingestion" component={IngestionForm}/>
      <Route path="/ingestion-wizard" component={WizardContainer} />
      <Route path="/dataset" component={Dataset}/>
      <Route path="/datasetdetail/:name" component={DatasetDetail}/>
      <PrivateRoute authed={true} path='/areautente' component={AreaUtente} />
    </div>
  </Router>
  
 </Provider>
)

const initialState = { 
  location: window.location.pathname, 
}; 
 
 
function activateHistoryListener() { 
  history.listen((location) => { 
    const user = firebase.auth().currentUser;      
    const newState = Object.assign(initialState, {  
      location: user ? location.pathname : '/login',            
    }); 
    App(newState); 
  }); 
}
 
function activateAuthListener() { 
  
  firebase.auth().onAuthStateChanged(((user) => {      
    console.log('user: ' + user);  
    if (user && window.location.pathname === '/login') { 
      return history.push('/'); 
    } 
    //return history.push(user ? window.location.pathname : '/login'); 
  })); 
} 
 
App(initialState); 
activateHistoryListener();   
activateAuthListener();      





/*
 <PrivateRoute path="/datastories" component={Datastories}/>
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

export const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
*/
export default App