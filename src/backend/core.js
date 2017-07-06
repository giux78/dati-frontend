import firebase from 'firebase'; 
 
const config = {  
    apiKey: "AIzaSyDJQlN2msxfouN45S-URbciTwHTxq8ReCI",
    authDomain: "data-portal-9009f.firebaseapp.com",
    databaseURL: "https://data-portal-9009f.firebaseio.com",
    projectId: "data-portal-9009f",
    storageBucket: "",
    messagingSenderId: "1032475333344"
}; 
 
firebase.initializeApp(config);          
 
export { firebase };                    