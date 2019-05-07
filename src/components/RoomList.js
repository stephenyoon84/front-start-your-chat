import React, {Component, Fragment} from 'react';
import {Grid, Input} from 'semantic-ui-react';

export default class RoomList extends Component {
  // state = {
  // }
  //
  // componentDidMount(){
  //   // fetch('http://localhost:3001/api/v1/rooms')
  //   //   .then(r => r.json())
  //   //   .then(chatRooms => this.setState({chatRooms}))
  // }

  filterByCategory = () => {
    if (this.props.categorySelected.name === 'All') {
      return this.props.chatRooms
    }
    const catS = this.props.categorySelected.id
    return this.props.chatRooms.filter(room => room.category_id === catS)
  }

  render() {
    return (
      <Fragment>
        <div className='ui grid'>
          <div className="row">
            <Grid.Column width={4}>
              <h3>{this.props.categorySelected.name} Chat Rooms</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={4}>
              <Input icon="search" placeholder='Search ChatRoom.' />
            </Grid.Column>
            {
              !!localStorage.getItem('token') ? (
                <Grid.Column floated="right" width={4}>
                  <button onClick={this.props.createNewRoomToggle}><h4>Create New Chat Room</h4></button>
                </Grid.Column>
              ) : (
                null
              )
            }
          </div>
        </div>
        <hr />
        <ul>
          {this.filterByCategory().map(room => {
            return <li key={room.id} data-category={room.category_id}><h4 onClick={(e) => this.props.selectChatRoom(e, room.id)}>{room.title}</h4> updated: {new Date(room.updated_at).toLocaleString()}</li>
          })}
        </ul>
      </Fragment>
    )
  }
}
