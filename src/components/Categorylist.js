import React, {Component} from 'react';
import{Input, Label, Menu} from 'semantic-ui-react';

export default class Categorylist extends Component {
  state = {
    activeItem: 'All',
    categories: ['All', 'Game'],
  }

  handleItemClick = (e, {name}) => {
    console.log(`will filter and show the list of ${name}`)
    this.setState({activeItem: name})
  }

  render() {
    const {activeItem} = this.state
    return (
      <Menu vertical>
        {this.state.categories.map(category => {
          return <Menu.Item key={category} name={category} active={activeItem === {category}} onClick={this.handleItemClick}>
            <Label color="teal">0</Label>
            {category}
          </Menu.Item>
        })}
        <Menu.Item onClick={() => console.log('link to create new category')}>
          New Category
        </Menu.Item>
        <Menu.Item >
          <Input icon='search' placeholder='Search ChatRoom.' />
        </Menu.Item>
      </Menu>
    )
  }
}
