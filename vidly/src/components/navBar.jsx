import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import logo from '../utils/images/JS-wallpaper.jpg'

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img style={{ width: '100px' }} src={logo} alt="" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {/* <NavLink className="nav-item nav-link" to="/movies">
              Movies
            </NavLink> */}
            <Dropdown>
              <Dropdown.Toggle variant="default" size="sm" id="dropdown-basic">
                Movies
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/movies">All Movies</Dropdown.Item>
                <Dropdown.Item href="/fav-movies">
                  Favorite Movies
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>

            {/* if we do not have a user */}
            {!user && (
              <>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </>
            )}

            {/*  if we do have a user */}
            {user && (
              <>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
                <NavLink className="nav-item nav-link" to="/profile">
                  <i>Welcome </i>
                  <b>
                    <u>{user.name}!</u>
                  </b>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
