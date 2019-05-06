import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Navbar from './Navbar'
import Categorylist from './Categorylist'

class App extends Component {
  state = {
    currentUser: false,
    roomSelected: false,
  }
  render() {
    return (
      <div className="App">
        <header>
          <div><h1>StartYourChat</h1></div>
        </header>

        <Navbar currentUser={this.state.currentUser}/>
        <hr />
        <section>
          {this.state.roomSelected ? (
            <div>Title</div>
          ) : (
            null
          )}
          <div className="ui grid">
            <div className="row">
              <div className="left three wide column">
                {this.state.roomSelected ? (
                  <div>Users</div>
                ) : (
                  <Categorylist />
                )}
              </div>
              <div className="right ten wide column">
                {this.state.roomSelected ? (
                  <div>ChatRoom</div>
                ) : (
                  <div>Rooms List</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
