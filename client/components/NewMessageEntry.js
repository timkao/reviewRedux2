import React, { Component } from 'react';
import store, { writeMessage, gotNewMessageFromServer } from '../store';
import axios from 'axios';

export default class NewMessageEntry extends Component {

  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange(ev) {
    const entry = ev.target.value
    const action = writeMessage(entry)
    store.dispatch(action)
  }

  handleSubmit(ev) {
    ev.preventDefault()
    const content = this.state.newMessageEntry
    axios.post('/api/messages', { content: content, channelId: this.props.channelId })
      .then(res => res.data)
      .then(message => store.dispatch(gotNewMessageFromServer(message)));
  }

  render () {
    const { newMessageEntry } = this.state
    const { handleChange, handleSubmit } = this

    return (
      <form id="new-message-form" onSubmit={handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value={newMessageEntry}
            onChange={handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
