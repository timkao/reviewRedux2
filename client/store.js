const GOT_MESSAGE_FROM_SERVER = 'GOT_MESSAGE_FROM_SERVER';

export const gotMessageFromServer = (messages) => {
  return {
    type: GOT_MESSAGE_FROM_SERVER,
    messages: messages
  }
}
