import fetch from 'isomorphic-fetch'
import page from './data/dataset'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const DELETE_POSTS = 'DELETE_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receiveDataset(subreddit, json) {
  console.log('receiveDataset');
  //This function creates an action that a reducer can handle 
  //Action are payload of information that sends data from the application to the store
  //Store doesn't have any other way to get data
  //Action are not responsible for update the state (only reducers) !!! 
  console.log('MODE: ' + process.env.NODE_ENV) 
  if(process.env.NODE_ENV=='development')
    return {
      type: RECEIVE_POSTS,
      subreddit,
      datasets: page,
      receivedAt: Date.now()
  }
  else  
  return {
      type: RECEIVE_POSTS,
      subreddit,
      datasets: json,
      receivedAt: Date.now()
  }
}


function cleanDataset(subreddit, json) {
  console.log('cleanDataset');
  //This function creates an action that a reducer can handle 
  return {
    type: DELETE_POSTS,
    subreddit,
    datasets: null,
    receivedAt: Date.now()
  }
}

function fetchDataset(subreddit) {
  console.log('fetchDataset');
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://localhost:9000/dati-gov/v1/ckan/searchDataset`)
      .then(response => response.json())
      .then(json => dispatch(receiveDataset(subreddit, json)))
  }
 
}

export function loadDatasets(subreddit) {
  console.log('Load Dataset action');
  return (dispatch, getState) => {
      return dispatch(fetchDataset(subreddit))
  }
 
}

export function unloadDatasets(subreddit) {
  console.log('Unload Dataset action');
  return (dispatch, getState) => {
      return dispatch(cleanDataset(subreddit))
  }
}
