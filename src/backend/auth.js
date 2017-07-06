import { firebase } from './core';  
import { history } from '../history'; 
 
const github = new firebase.auth.GithubAuthProvider(); 	 
github.addScope('user:email');     	 
 
export function loginWithGithub(provider) {           
  return firebase.auth().signInWithRedirect(github);  
}                                    
 
export function logout(){           
  return new Promise((resolve,reject) => {            	 
    firebase.auth().signOut().then(() => {            
      history.push('/login');       
      resolve();                    
    }, error => reject(error));     
  }); 
} 
