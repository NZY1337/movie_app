import React from 'react'
import {Link} from 'react-router-dom'

const Customers = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <h1>Customers</h1>
          <Link to="/customers/new">Add New Customer</Link>
        </div>
      </div>
    </div>
  )
}

export default Customers
