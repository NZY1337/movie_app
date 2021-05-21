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
        name: '',
        isGold: true,
        phone: '',
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
    //  await saveCustomer(this.state.data)
    const URL = `http://localhost:3900/api/customers/${this.props.match.params.id}`
    const data = new FormData()

    data.append('name', 'test')
    data.append('file', this.state.data.imageBase64)

    axios
      .put(URL, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
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
