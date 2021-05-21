import React from 'react'
import Joi from 'joi-browser'
import Form from './common/form'
import auth from '../services/authService'

// register now is a method of userServices object
import * as userService from '../services/userService'

// import only register
// import { register } from '../services/userService'

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  }

  schema = {
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name'),
  }

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data)
      auth.loginWithJwt('token', response.headers['x-auth-token'])

      // reload the page
      window.location = '/'
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors }
        // comes from the server
        errors.username = ex.response.data
        this.setState({ errors })
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput('username', 'Username')}
              {this.renderInput('password', 'Password', 'password')}
              {this.renderInput('name', 'Name')}
              {this.renderButton('Register')}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm
