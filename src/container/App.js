import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from './Home'
import HomePrivata from './HomePrivata'
import Full from './Full'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import { Provider } from 'react-redux';
import configureStore from '../configureStore'
import DatasetDetail from '../components/Dataset/DatasetDetail'
import WizardContainer from './WizardContainer'
import SlimHeader from '../components/MegaHeader/SlimHeader'
import {  opts,listToMegaMenu, Megamenu} from '../components/MegaHeader/megamenu'

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
          {this.state.authed ?
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/dashboard" className="navbar-brand">Data Portal</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/dashboard" className="navbar-brand">Area Privata</Link> 
                </li>
                <li>
                  <Link to="/ingestion-wizard" className="navbar-brand">Ingestion</Link>
                </li>
                <li>
                  <Link to="/admin/dashboard" className="navbar-brand">Full</Link>
                </li>
                <li>
                    <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand">Logout</button>
                </li>
              </ul>
            </div>
          </nav>
          :
          <div className="u-background-95">
          <div className="u-layout-wide u-layoutCenter">
          <ul className="Skiplinks js-fr-bypasslinks u-hiddenPrint">
            <li><a href="#main">Vai al Contenuto</a></li>
            <li><a className="js-fr-offcanvas-open" href="#menu"
              aria-controls="menu" aria-label="accedi al menu" title="accedi al menu">Vai alla navigazione del sito</a></li>
          </ul>
          <header className="Header  u-hiddenPrint">
          <SlimHeader/>
            <div className="Header-navbar u-background-50">
              <div className="u-layout-wide Grid Grid--alignMiddle u-layoutCenter">
                <div className="Header-logo Grid-cell" aria-hidden="true">
                  <a href="" tabIndex="-1">
                    <img src="http://designer.italia.it/images/loghi/logo-it.svg" alt=""/>
                  </a>
                </div>

                <div className="Header-title Grid-cell">
                  <h1 className="Header-titleLink">
                    <a href="/">
                      /dataportal <span className="u-lg-hidden u-md-hidden u-sm-hidden u-cf u-padding-top-xxs u-block"></span>
                  <span className="u-color-20 u-text-xxs
                  u-alignMiddle u-padding-right-xxs u-padding-left-xxs">beta</span><br/>
                      <small>Dati Pubblici</small>
                    </a>
                  </h1>
                </div>

                <div className="Header-searchTrigger Grid-cell">
                  <button aria-controls="header-search" className="js-Header-search-trigger Icon Icon-search u-background-50"
                    title="attiva il form di ricerca" aria-label="attiva il form di ricerca" aria-hidden="false">
                  </button>
                  <button aria-controls="header-search" className="js-Header-search-trigger Icon Icon-close u-hidden u-background-50"
                    title="disattiva il form di ricerca" aria-label="disattiva il form di ricerca" aria-hidden="true">
                  </button>
                </div>

                <div className="Header-utils Grid-cell">
                  <div className="Header-social Headroom-hideme">
                    <p>Seguici su</p>
                    <ul className="Header-socialIcons">
                      <li><a href="" title="Facebook"><span className="Icon-facebook"></span><span className="u-hiddenVisually">Facebook</span></a></li>
                      <li><a href="" title="Twitter"><span className="Icon-twitter"></span><span className="u-hiddenVisually">Twitter</span></a></li>
                      <li><a href="" title="Youtube"><span className="Icon-youtube"></span><span className="u-hiddenVisually">Youtube</span></a></li>
                    </ul>
                  </div>
                  <div className="Header-search" id="header-search">
                  </div>
                </div>
                <div className="Header-toggle Grid-cell">
                  <a className="Hamburger-toggleContainer js-fr-offcanvas-open u-nojsDisplayInlineBlock u-lg-hidden u-md-hidden" href="#menu"
                    aria-controls="menu" aria-label="accedi al menu" title="accedi al menu">
                    <span className="Hamburger-toggle" role="presentation"></span>
                    <span className="Header-toggleText" role="presentation">Menu</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="Headroom-hideme u-textCenter u-hidden u-sm-hidden u-md-block u-lg-block">
                <nav className="Megamenu Megamenu--default js-megamenu u-background-50" data-rel=".Offcanvas .Treeview"></nav>
            </div>
          </header>
          </div>
          <nav className="Megamenu Megamenu--default js-megamenu ">
              <ul className="Megamenu-list">
                <li className="Megamenu-item">
                    <a href="/">
                      Home
                      </a>
                      </li>
                  <li className="Megamenu-item">
                      <a href="/login">
                        Login
                      </a>
                  </li>
                 <li className="Megamenu-item">
                      <a href="/register">
                        Register
                      </a>
                  </li>
              </ul>
            </nav>
          </div>
          } 
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <Route authed={this.state.authed} path='/login' component={Login} />
                <Route authed={this.state.authed} path='/register' component={Register} />
                <Route path="/datasetdetail/:name" component={DatasetDetail}/>
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={HomePrivata} />
                <PrivateRoute authed={this.state.authed} path='/ingestion-wizard' component={WizardContainer} />
                <PrivateRoute authed={this.state.authed} path='/admin/dashboard' component={Full} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          {!this.state.authed &&
            <div className="u-background-95">
              <div className="u-layout-wide u-layoutCenter u-layout-r-withGutter u-hiddenPrint">
                <footer className="Footer u-background-95">
                  <div className="Grid Grid--withGutter u-padding-top-xl">
                      <div className="Grid-cell u-layout-centerLeft u-padding-r-bottom">
                        <img className="Footer-logo u-xs-padding-right-none" src="https://www.spid.gov.it/assets/img/agid-logo-bb.svg" alt=""/>
                        <p className="Footer-siteName"></p>
                      </div>
                      <div className="Grid-cell u-layout-centerRight u-padding-r-bottom u-flexAlignSelfEnd">
                        <h3 className="u-md-flexInline u-lg-flexInline u-text-p u-color-white u-textWeight-400
                          u-hidden u-margin-r-right u-flexAlignSelfCenter">Seguici su</h3>
                        <ul className="Footer-socialIcons">
                          <li><a href=""><span className="Icon Icon-facebook u-background-white"></span><span className="u-hiddenVisually">Facebook</span></a></li>
                          <li><a href=""><span className="Icon Icon-twitter u-background-white"></span><span className="u-hiddenVisually">Twitter</span></a></li>
                          <li><a href=""><span className="Icon Icon-youtube u-background-white"></span><span className="u-hiddenVisually">Youtube</span></a></li>
                        </ul>
                      </div>
                  </div>
                    <ul className="Footer-links u-cf u-color-80">
                    <li><a href="" title="Privacy policy">Privacy</a></li>
                    <li><a href="" title="Note legali">Note legali</a></li>
                    <li><a href="" title="Dati monitoraggio sito">Contatti</a></li>
                  </ul>
                </footer>
              </div>
            </div>
       } 
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}
