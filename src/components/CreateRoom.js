import React, {Component} from 'react';
import {Grid, Form, Button} from 'semantic-ui-react';

export default class CreateRoom extends Component {
  state = {
    selectedCategory: 'Game'
  }
  submitHandler = (e) => {
    e.preventDefault()
    let title = e.currentTarget.parentElement.title.value
    let category = this.state.selectedCategory
    let token = localStorage.getItem('token')
    fetch("http://localhost:3001/api/v1/rooms", {
      method: 'POST',
      headers: {
        "Content_Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        room: {
          title: title,
          category: category
        }
      })
    }).then(r => r.json())
      .then(() => this.props.createNewRoomToggle())
  }

  handleResponse = json => {

  }

  changeHandler = e => {
    this.setState({selectedCategory: e.target.innerText})
  }

  categoriesOption = () => {
    const optlist = this.props.categories.filter(op => op.name !== 'All')
    const options = optlist.map((cat) => {
      return {key: cat.id, text: cat.name, value: cat.name}
    })
    return options
  }

  render() {
    return (
      <div>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Input label="Title" placeholder="Title" name="title"/>
              <Form.Dropdown fluid selection options={this.categoriesOption()} label="Category" value={this.state.selectedCategory} onChange={this.changeHandler} name="category"/>

              <Button content="Create New Room" onClick={this.submitHandler}/>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
