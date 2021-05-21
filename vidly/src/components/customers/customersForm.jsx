import React from 'react'
import Joi from 'joi-browser'
import Form from '../common/form'
import { saveCustomer } from '../../services/customerService'
import axios from 'axios'

class CustomersForm extends Form {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        name: 'asdasd',
        isGold: true,
        phone: 'asdasd',
        imageBase64: null,
      },
      errors: {},
      isGold: [
        {
          _id: true,
          name: 'Yes',
        },
        {
          _id: false,
          name: 'No',
        },
      ],
    }
  }

  schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    imageBase64: Joi.any(),
  }

  doSubmitCustomer = async (e) => {
   
    const data = new FormData()

    data.append('name', this.state.data.name,)
    data.append('file', this.state.data.imageBase64)
    data.append('isGold', this.state.data.isGold)
    data.append('phone', this.state.data.phone)
    
     await saveCustomer(data)
  }

  mapCustomerToView = (customer) => {
    return {
        //   !delete the id when submitting this
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
        imageBase64: customer.imageBase64,
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1>Edit Customer</h1>
            <form
              action="#"
              onSubmit={this.handleSubmit}
              className="edit-form-movie"
            >
              {this.renderInput('name', 'Name')}
              {this.renderInput('phone', 'Phone')}
              {this.renderSelect('isGold', 'Gold Customer', this.state.isGold)}
              {this.renderInput('imageBase64', 'User Image', 'file')}
              {this.renderButton('Save')}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CustomersForm
