import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import socket from './socket';

const initialState = {
  messages: [],
  newMessageEntry: ''
}

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'
const WRITE_MESSAGE = 'WRITE_MESSAGE'
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER'

export const gotMessageFromServer = (messages) => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messages
  }
}

export const writeMessage = (entry) => {
  return {
    type: WRITE_MESSAGE,
    entry: entry
  }
}

export const gotNewMessageFromServer = (message) => {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message: message
  }
}

export const fetchMessage = () => {
  return (dispatch) => {
    return axios.get('/api/messages')
    .then(res => res.data)
    .then(messages => {
      const action = gotMessageFromServer(messages)
      dispatch(action)
    });
  }
}

export const addMessage = (content, channelId) => {
  return (dispatch) => {
    return axios.post('/api/messages', {content, channelId})
      .then(res => res.data)
      .then(message => {
        dispatch(gotNewMessageFromServer(message))
        socket.emit('new-message', message);
      });
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, messages: action.messages}
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {...state, messages: [...state.messages, action.message]}
    case WRITE_MESSAGE:
      return {...state, newMessageEntry: action.entry}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware))
export default store
