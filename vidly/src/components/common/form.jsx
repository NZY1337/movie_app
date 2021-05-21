import React, { Component } from 'react'
import Joi from 'joi-browser'
import Input from './input'
import Select from './select'

class Form extends Component {
  state = {
    data: {},
    errors: {},
  }

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.data, this.schema, options)
    if (!error) return null

    const errors = {}
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const schema = { [name]: this.schema[name] }
    const { error } = Joi.validate(obj, schema)
    return error ? error.details[0].message : null
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const errors = this.validate()
    this.setState({ errors: errors || {} })
    if (errors) return

    //  this.doSubmitMovie()

    this.doSubmitCustomer()
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMessage = this.validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    const data = { ...this.state.data }

    data[input.name] = input.value

    //? for input type Checkbox = MovieForm
    if (input.type === 'checkbox') {
      data[input.name] = input.checked
    }

    //? for input type file = CustomerForm
    if (input.type === 'file') {
      data[input.name] = input.files[0]
    }

    this.setState({ data, errors })
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn popcorn-btn">
        {label}
      </button>
    )
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }

  //! input[type="file" should not have a value] - THINK ABOUT IT AGAIN or refactor the code
  renderInput(name, label, type = 'text', checked, accept = '.jpg') {
    const { data, errors } = this.state

    return (
      <Input
        type={type}
        name={name}
        defaultValue={
          type === 'file' && data[name] !== null ? data[name].name : data[name]
        }
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        checked={checked}
        accept={accept}
      />
    )
  }
}

export default Form
