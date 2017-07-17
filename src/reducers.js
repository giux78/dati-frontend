import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';
import {
  REQUEST_DATASETS,
  RECEIVE_DATASETS,
  DELETE_DATASETS,
  SELECT_DATASET
} from './actions'

//The reducer is just an action that take two parameter state and action
//The reducer that handle the action will make a copy of the state,
//modify it with the data from the action and then  returns the new state
function selectedDataset(state = 'selectDataset', action) {
  switch (action.type) {
    case SELECT_DATASET:
      return action.selectDataset
    default:
      return state
  }
}

//Object.assign({}, state, .. create a new copy of the state
function datasets( state = { isFetching: false, didInvalidate: false, items: [] },action
) {
  switch (action.type) {
    case REQUEST_DATASETS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_DATASETS:
      return Object.assign({}, state, {
        selectDataset: action.selectDataset,
        isFetching: false,
        didInvalidate: false,
        items: action.datasets,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function datasetReducer(state = {}, action) {
  switch (action.type) {
    case DELETE_DATASETS:
    case RECEIVE_DATASETS:
    case REQUEST_DATASETS:
      return Object.assign({}, state, {
        [action.selectDataset]: datasets(state[action.selectDataset], action)
      })
    default:
      return state
  }
}

//will mount each reducer with the corresponding key (datasetReducer)
//but you can change it by naming the key differently (form: reduxFormReducer)
const rootReducer = combineReducers({
  form: reduxFormReducer,
  datasetReducer,
  selectedDataset
})

export default rootReducer