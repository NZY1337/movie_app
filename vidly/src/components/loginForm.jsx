import React from 'react'
import Joi, { errors } from 'joi-browser'
import Form from './common/form'
import auth from '../services/authService'

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  }

  doSubmit = async () => {
    try {
      const { data } = this.state
      await auth.login(data.username, data.password)

      // reload the page
      window.location = '/'
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors }
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
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput('username', 'Username')}
              {this.renderInput('password', 'Password', 'password')}
              {this.renderButton('Login')}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
