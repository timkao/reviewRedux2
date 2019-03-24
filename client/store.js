import { createStore } from 'redux'

const initialState = {
  messages: []
}

const GOT_MESSAGE_FROM_SERVER = 'GOT_MESSAGE_FROM_SERVER';

export const gotMessageFromServer = (messages) => {
  return {
    type: GOT_MESSAGE_FROM_SERVER,
    messages: messages
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGE_FROM_SERVER:
      return Object.assign({}, state, {messages: action.messages})
    default:
      return state
  }
}

const store = createStore(reducer)
export default store
