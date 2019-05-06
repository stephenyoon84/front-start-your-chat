import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'semantic-ui-react'

export default class Navbar extends Component {
  state ={}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render(){
    const {activeItem} = this.state

    return (
      <Menu>
        <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick}>Home</Menu.Item>
          { this.props.currentUser ? (
            <Fragment>
              <Menu.Item name='Profile' active={activeItem === 'Profile'} onClick={this.handleItemClick}>
                Profile
              </Menu.Item>
              <Menu.Item className="right" name='Logout' active={activeItem === 'Logout'} onClick={() => console.log('Will clear token')}>
                Log Out
              </Menu.Item>
            </Fragment>
          ) : (
            <Menu.Item className='right' name='SignIn' active={activeItem === 'SignIn'} onClick={() => (console.log('redirect to login (or signup) page'))}>
              Sign In
            </Menu.Item>
          ) }
      </Menu>
    )
  }
}
