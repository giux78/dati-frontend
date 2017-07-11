import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  DELETE_POSTS
} from './actions'

//The reducer is just an action that take two parameter state and action
//The reducer that handle the action will make a copy of the state,
//modify it with the data from the action and then  returns the new state
function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

//Object.assign({}, state, .. create a new copy of the state
function datasets(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.datasets,
        lastUpdated: action.receivedAt
      })
    case DELETE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: null,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case DELETE_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: datasets(state[action.subreddit], action)
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: datasets(state[action.subreddit], action)
      })
    default:
      return state
  }
}

//will mount each reducer with the corresponding key (postsBySubreddit, selectedSubreddit)
//but you can change it by naming the key differently (form: reduxFormReducer)
const rootReducer = combineReducers({
  form: reduxFormReducer,
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer