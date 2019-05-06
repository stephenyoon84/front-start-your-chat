import React, {Component} from 'react';
import {Button, Form, Grid, Segment} from 'semantic-ui-react';

export default class Signup extends Component {
  handleSubmit = e => {
    e.preventDefault()
    let username = e.currentTarget.parentElement.username.value
    let email = e.currentTarget.parentElement.email.value
    let password = e.currentTarget.parentElement.password.value
    let password_confirmation = e.currentTarget.parentElement.password_confirmation.value
    fetch("http://localhost:3001/api/v1/signup", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      })
    }).then(r => r.json())
      .then(this.handleResponse)
  }

  handleResponse = json => {
    if (json["success"]) {
      localStorage.setItem("token", json["token"])
      this.props.setCurrentUser(json["username"])
      this.props.history.push('/')
    } else {
      console.log("Error")
    }
  }

  render(){
    return (
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Input icon='user' iconPosition="left" label="username" placeholder="Username" name="username"/>
              <Form.Input icon='mail' iconPosition="left" label="email" placeholder="Email" name="email"/>
              <Form.Input icon='lock' iconPosition="left" label="password" type="password" placeholder="Password" name="password"/>
              <Form.Input icon='lock' iconPosition="left" label="password_confirmation" type="password" placeholder="Password Confirmation" name="password_confirmation"/>

              <Button content="Sign Up" primary onClick={this.handleSubmit}/>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}
