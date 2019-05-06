import React, {Component} from 'react';
import{Label, Menu} from 'semantic-ui-react';

export default class Categorylist extends Component {
  state = {
    activeItem: 'All',
  }

  handleItemClick = (category) => {
    console.log(`will filter and show the list of ${category.name}`)
    this.props.changeCategory(category)
    this.setState({activeItem: category.name})
  }

  submitHandler = e => {
    e.preventDefault()
    let newName = e.target.name.value
    fetch('http://localhost:3001/api/v1/categories', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newName
      })
    }).then(r => r.json())
      .then(d => this.props.addNewCategory(d))
  }

  render() {
    const {activeItem} = this.state
    return (
      <Menu vertical>
        {this.props.categories.map(category => {
          return <Menu.Item key={category.id} name={category.name} active={activeItem === {category}} onClick={()=>this.handleItemClick(category)}>
            {
              category.name === 'All' ? (null) : (<Label color="teal">{category.rooms ? category.rooms.length : null}</Label>)
            }
            {category.name}
          </Menu.Item>
        })}
        <Menu.Item>
          New Category
          <form onSubmit={this.submitHandler}>
            <input type="text" name="name" placeholder="Category Name"/>
            <input type="submit" disabled={!localStorage.token}/>
          </form>
        </Menu.Item>
      </Menu>
    )
  }
}
