import React from 'react';
import {Button, Divider, Form, Grid, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


export default class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    let username = e.currentTarget.parentElement.username.value
    let password = e.currentTarget.parentElement.password.value
    fetch("http://localhost:3001/api/v1/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
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
              <Form.Input icon='lock' iconPosition="left" label="password" type="password" placeholder="Password" name="password"/>

              <Button content="Login" primary onClick={this.handleSubmit}/>
            </Form>
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Button content={<Link to="/signup"><div>Sign Up</div></Link>} size="big" />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    )
  }
}
