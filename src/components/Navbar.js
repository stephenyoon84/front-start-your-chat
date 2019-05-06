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
        <Menu.Item name='Home'><Link to="/"><div>Home</div></Link></Menu.Item>
          { !!localStorage.token ? (
            <Fragment>
              <Menu.Item name='Profile' active={activeItem === 'Profile'} onClick={this.handleItemClick}>
                Profile
              </Menu.Item>
              <Menu.Item className="right" name='Logout' active={activeItem === 'Logout'} onClick={() => {
                  localStorage.clear()
                  this.props.setCurrentUser(null)
                }}>
                Log Out
              </Menu.Item>
            </Fragment>
          ) : (
            <Menu.Item className='right' name='SignIn'>
              <Link to="/login"><div>Sign In</div></Link>
            </Menu.Item>
          ) }
      </Menu>
    )
  }
}
