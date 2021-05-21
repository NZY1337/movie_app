import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Movies from './components/movies'
import MovieForm from './components/movieForm'

import Rentals from './components/rentals'
import NotFound from './components/notFound'
import NavBar from './components/navBar'
import LoginForm from './components/loginForm'
import RegisterForm from './components/registerForm'
import FavoriteMovie from './components/favoriteMovie'
import MovieComponent from './components/movieComponent'
import Logout from './components/logout'
import auth from './services/authService'

// customers
import Customers from './components/customers/customers'
import CustomersForm from './components/customers/customersForm'

import ProtectedRoute from './components/common/protectedRoute'
import './App.css'
class App extends Component {
  state = {}

  componentDidMount = () => {
    const user = auth.getUser()

    this.setState({
      user,
    })
  }

  render() {
    const { user } = this.state
    return (
      <>
        <NavBar user={user} />

        <Switch>
          //customers
          <Route path="/customers/:id" component={CustomersForm} />
          <Route path="/customers" exact component={Customers} />
          //other
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/fav-movies" exact component={FavoriteMovie} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route path="/fav-movies/:id" component={MovieComponent} />
          <Route //! pass the props object in the route because it gives us the acces to the history, match, etc...
            path="/movies"
            render={(props) => <Movies {...props} user={this.state.user} />}
          />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </>
    )
  }
}

export default App
