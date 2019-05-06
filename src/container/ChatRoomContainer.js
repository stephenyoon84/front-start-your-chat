import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {Grid} from 'semantic-ui-react';
import Categorylist from '../components/Categorylist';
import RoomList from '../components/RoomList';

class ChatRoomContainer extends Component {
  state = {
    categorySelected: {name: 'All'},
    roomSelected: false,
    categories: [{id: 0, name: 'All'}],
    createNewRoom: false,
  }

  componentDidMount(){
    fetch('http://localhost:3001/api/v1/categories')
      .then(r => r.json())
      .then(cat => {
        this.setState({
          categories: [...this.state.categories, ...cat]
        })
      })
  }

  addNewCategory = (category) => {
    this.setState({categories: [...this.state.categories, category]})
  }

  changeCategory = (name) => {
    this.setState({categorySelected: name})
  }

  render() {
    return (
      <section>
        {this.state.roomSelected ? (
          <div>Title</div>
        ) : (
          null
        )}
        <div className="ui grid">
          <div className="row">
            <Grid.Column floated='left' width={3}>
              {this.state.roomSelected ? (
                <div>Users</div>
              ) : (
                <Categorylist categories={this.state.categories} changeCategory={this.changeCategory} addNewCategory={this.addNewCategory}/>
              )}
            </Grid.Column>
            <Grid.Column floated='right' width={12}>
              {this.state.roomSelected ? (
                <div>ChatRoom</div>
              ) : ( this.state.createNewRoom ? (
                  <div>Create New Room</div>
                ) : (
                  <RoomList categorySelected={this.state.categorySelected}/>
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
