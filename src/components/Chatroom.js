import React, {Component} from 'react';
import {Grid, Form, Input} from 'semantic-ui-react';

export default class Chatroom extends Component {
  state = {
    messages: [],
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <div><h2>{this.props.room.title}</h2></div>
        <div className="chat room" data-channel-subscribe="room" data-room-id={this.props.room.id}>
          <div>messages</div>
          <div>messages</div>
          <div>messages</div>
          <div>messages</div>
          <div>messages</div>
          <div>messages</div>
          <div>messages</div>
          <div>messages</div>
        </div>
        <Form>
          <Form.Input type="text" name="message" />
          <Form.Input type="submit" />
        </Form>
        <div onClick={this.props.selectChatRoom}>Chat Room</div>
      </div>
    )
  }
}
