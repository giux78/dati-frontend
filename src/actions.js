import fetch from 'isomorphic-fetch'
import page from './data/dataset'
import { serviceurl } from './config/serviceurl.js'
export const REQUEST_DATASETS = 'REQUEST_DATASETS'
export const RECEIVE_DATASETS = 'RECEIVE_DATASETS'
export const DELETE_DATASETS = 'DELETE_DATASETS'
export const SELECT_DATASET = 'SELECT_DATASET'


function requestDatasets(selectDataset) {
  return {
    type: REQUEST_DATASETS,
    selectDataset
  }
}

function receiveDataset(selectDataset, json) {
  console.log('receiveDataset');
  //This function creates an action that a reducer can handle 
  //Action are payload of information that sends data from the application to the store
  //Store doesn't have any other way to get data
  //Action are not responsible for update the state (only reducers) !!! 
  console.log('MODE: ' + process.env.NODE_ENV) 
  if(process.env.NODE_ENV=='development')
    return {
      type: RECEIVE_DATASETS,
      selectDataset,
      datasets: page,
      receivedAt: Date.now()
  }
  else  
  return {
      type: RECEIVE_DATASETS,
      selectDataset,
      datasets: json,
      receivedAt: Date.now()
  }
}

function cleanDataset(selectDataset, json) {
  console.log('cleanDataset');
  //This function creates an action that a reducer can handle 
  return {
    type: DELETE_DATASETS,
    selectDataset,
    datasets: null,
    receivedAt: Date.now()
  }
}

function fetchDataset(selectDataset, query) {
  console.log('fetchDataset');
  var url = 'http://' + serviceurl.DatasetBackend.Search.host + ':' + serviceurl.DatasetBackend.Search.port + serviceurl.DatasetBackend.Search.name + '?q='+query+'&rows=20';
  console.log(url);
  if(process.env.NODE_ENV=='development'){
    return dispatch => {dispatch(receiveDataset(selectDataset, null))}
  } else {
    return dispatch => {
      dispatch(requestDatasets(selectDataset))
      return fetch(url)
        .then(response => response.json())
        .then(json => dispatch(receiveDataset(selectDataset, json)))
    }
  }
}

export function loadDatasets(selectDataset, query) {
  console.log('Load Dataset action');
  return (dispatch, getState) => {
      return dispatch(fetchDataset(selectDataset, query))
  }
 
}

export function unloadDatasets(selectDataset) {
  console.log('Unload Dataset action');
  return (dispatch, getState) => {
      return dispatch(cleanDataset(selectDataset))
  }
}
