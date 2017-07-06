import React, { Component } from 'react'; 
import { logout } from '../backend/auth'; 
import { firebase } from '../backend/core';  
import { Link } from 'react-router-dom'
 
class Navigation extends Component { 
  constructor(props) { 
    super(props); 
    this.handleLogout = this.handleLogout.bind(this);   		 
    this.state={  		 
      user: null, 		 
    };            		 
  } 
  componentDidMount(){ 
    firebase.auth().onAuthStateChanged(user => this.setState({ user })); 	
  } 
 
  handleLogout(){ 		 
    logout().then(() => this.setState({ user: null }));            		 
  }               
 
  render(){ 
    return( 
            <li className="Megamenu-area">
            {this.state.user?        		 
                    <a className="Button Button--default u-color-95" onClick={this.handleLogout} href="#">Logout</a>
              :          		 
                    <a className="Button Button--default u-color-95" href="/login">Login</a>	 
            }
            </li>  
    ); 
  } 
} 

export default Navigation; 