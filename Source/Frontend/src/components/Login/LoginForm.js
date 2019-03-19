import React, { Component } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleLogin() {
    this.props.login({
        username: this.state.username,
        password: this.state.password
    });
  }

  render() {
    return (
      <div id="login-form">
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
            placeholder="username@studin.aubgin.local"
          />
        </FormGroup>
        <FormGroup className="mb-4">
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            placeholder="••••••••" />
        </FormGroup>
        <Button color="primary" onClick={this.handleLogin}>Login</Button>
      </div>
    );
  }
}

export default LoginForm;
