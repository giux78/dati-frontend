import React, { Component } from 'react'; 
import { loginWithGithub } from '../backend/auth';  	 
 
export class Login extends Component{ 
  constructor(props){ 
    super(props); 
    this.handleGithubLogin = this.handleGithubLogin.bind(this);  	 
  } 
 
  handleGithubLogin(e) {  
    e.preventDefault();   	 
    loginWithGithub();     
  } 
 
  render() { 
    return ( 
     <div className="container"> 
       <div className="row middle‐xs text‐center"> 
         <div className="col‐xs‐12 col‐sm‐6 col‐sm‐offset‐3"> 
            <h1>Scegli il metodo per il login: </h1> 
         </div> 
          </div> 
 
       <div className="row center‐xs"> 
         <div className="col‐sm‐6 col‐xs‐12"> 
          <button onClick={this.handleGithubLogin} className="btn btn‐default btn‐block"> 
            <i className="fa fa‐github"/>log in with Github 
          </button> 
        </div> 
       </div> 
      </div> 
    ); 
  } 
} 

export default Login;