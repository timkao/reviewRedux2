import { createStore } from 'redux'

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

const store = createStore(reducer)
export default store
