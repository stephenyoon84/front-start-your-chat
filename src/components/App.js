import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {Grid} from 'semantic-ui-react';
import Navbar from './Navbar';
import ChatRoomContainer from '../container/ChatRoomContainer'
import Login from './Login'
import Signup from './Signup'

class App extends Component {
  state = {
    currentUser: null,
  }

  setCurrentUser = (name) => {
    this.setState({currentUser: name})
  }

  render() {
    return (
      <div className="App">
        <header>
          <div><h1>StartYourChat</h1></div>
        </header>

        <Navbar setCurrentUser={this.setCurrentUser}/>
        <hr />
        <Route exact path="/" component={ChatRoomContainer} />
        <Route path="/login" render={(props)=><Login setCurrentUser={this.setCurrentUser} {...props}/>}/>
        <Route path="/signup" render={(props) => <Signup setCurrentUser={this.setCurrentUser} {...props}/>}/>
      </div>
    );
  }
}

export default App;
