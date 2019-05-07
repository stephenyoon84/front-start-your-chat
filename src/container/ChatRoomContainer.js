import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Grid} from 'semantic-ui-react';
import Categorylist from '../components/Categorylist';
import RoomList from '../components/RoomList';
import CreateRoom from '../components/CreateRoom'
import Chatroom from '../components/Chatroom'
import {ActionCableConsumer} from 'react-actioncable-provider'


class ChatRoomContainer extends Component {
  state = {
    categorySelected: {name: 'All'},
    roomSelected: false,
    categories: [{id: 0, name: 'All'}],
    createNewRoom: false,
    chatRooms: [],
  }

  componentDidMount(){
    fetch('http://localhost:3001/api/v1/categories')
      .then(r => r.json())
      .then(cat => {
        this.setState({
          categories: [...this.state.categories, ...cat]
        })
      })
    fetch('http://localhost:3001/api/v1/rooms')
      .then(r => r.json())
      .then(chatRooms => this.setState({chatRooms}))

  }

  handleReceivedRoom = response => {
    const {room} = response;
    this.setState({
      chatRooms: [...this.state.chatRooms, room]
    })
  }

  addNewCategory = (category) => {
    this.setState({categories: [...this.state.categories, category]})
  }

  createNewRoomToggle = () => {
    this.setState({createNewRoom: !this.state.createNewRoom})
  }

  changeCategory = (name) => {
    this.setState({categorySelected: name})
  }

  selectChatRoom = (e, id) => {
    const room = this.state.chatRooms.find(r => r.id === id)
    if (!!localStorage.token) {
      this.setState({roomSelected: room})
    }
  }

  backToRoomList = () => {
    this.setState({roomSelected: null})
  }


  render() {
    return (
      <section>
        <div className="ui grid">
          <div className="row">
            <Grid.Column floated='left' width={3}>
              {this.state.roomSelected ? (
                <div>Details</div>
              ) : (
                <Categorylist categories={this.state.categories} changeCategory={this.changeCategory} addNewCategory={this.addNewCategory}/>
              )}
            </Grid.Column>
            <Grid.Column floated='right' width={12}>
              <ActionCableConsumer channel={{ channel: 'RoomsChannel' }} onReceived={this.handleReceivedRoom} />
              {this.state.roomSelected ? (
                <Chatroom selectChatRoom={this.backToRoomList} room={this.state.roomSelected}/>
              ) : ( this.state.createNewRoom ? (
                  <CreateRoom createNewRoomToggle={this.createNewRoomToggle} categories={this.state.categories}/>
                ) : (
                  <RoomList categorySelected={this.state.categorySelected} createNewRoomToggle={this.createNewRoomToggle} selectChatRoom={this.selectChatRoom} chatRooms={this.state.chatRooms}/>
                )
              )}
            </Grid.Column>
          </div>
        </div>
      </section>
    );
  }
}

export default ChatRoomContainer;
