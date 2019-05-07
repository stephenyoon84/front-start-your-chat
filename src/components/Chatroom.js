import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import {ActionCableConsumer} from 'react-actioncable-provider';
import Cable from './Cable';

export default class Chatroom extends Component {
  state = {
    messages: [],
  }

  componentDidMount(){
    const token = localStorage.getItem('token')
    fetch('http://localhost:3001/api/v1/room_messages', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(d => d.filter(i => i.room_id === this.props.room.id))
      .then(messages => this.setState({messages}))
      .then(() => this.updateScroll())
  }

  handleReceivedMessage = response => {
    const {message} = response;
    this.setState({messages: [...this.state.messages, response.room_message]})
  }

  updateScroll = () => {
    const element = document.querySelector('.chat')
    if (!!element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  submitHandler = (e) => {
    e.preventDefault()
    let message = e.target.message.value
    let room_id = this.props.room.id
    let token = localStorage.getItem('token')
    fetch('http://localhost:3001/api/v1/room_messages', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        room_message: {
          message: message,
          room_id: room_id
        }
      })
    }).then(r => r.json())
    e.target.message.value = ""
  }

  render() {
    return (
      <div>
        <div><h2>{this.props.room.title}</h2></div>
        <div className="chat" data-channel-subscribe="room" data-room-id={this.props.room.id}>
          <ActionCableConsumer channel={{channel: 'RoomMessagesChannel'}} onReceived={this.handleReceivedMessage} />
          {
            this.state.messages.map(msg => {
              return (
                <div key={msg.id}>{msg.user.username} - {msg.message}</div>
              )
            })
          }
        </div>
        <Form onSubmit={this.submitHandler}>
          <Form.Input type="text" name="message" />
          <Form.Input type="submit" />
        </Form>
        <button onClick={this.props.selectChatRoom}>Leave Room</button>
      </div>
    )
  }
}
