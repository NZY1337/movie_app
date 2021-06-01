import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { saveCustomer, getCustomer } from "../../services/customerService";
import axios from "axios";

class CustomersForm extends Form {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      data: {
        name: "",
        isGold: null,
        phone: "",
        imageBase64: null,
      },
      errors: {},
      isGold: [
        {
          _id: true,
          name: "Yes",
        },
        {
          _id: false,
          name: "No",
        },
      ],
    };
  }

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    imageBase64: Joi.any(),
    moviesRented: Joi.string(),
  };

  async populateCustomer() {
    try {
      // detect if we edit a new movie or not
      const customerId = this.props.match.params.id;
      if (customerId === "new") return;

      const { data: customer } = await getCustomer(customerId);

      this.setState({ data: this.mapCustomerToView(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateCustomer();
  }

  doSubmitCustomer = async (e) => {
    const data = new FormData();

    data.append("name", this.state.data.name);
    if (this.inputRef.current.value !== "") {
      data.append("file", this.state.data.imageBase64);
    }
    data.append("isGold", this.state.data.isGold);
    data.append("phone", this.state.data.phone);

    const findCustomerId = this.props.match.params.id !== "new" ? this.props.match.params.id : null;
    await saveCustomer(data, findCustomerId);

    this.props.history.push("/customers");

    // console.log(this.inputRef.current.value)
  };

  mapCustomerToView = (customer) => {
    return {
      //   !delete the id when submitting this
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
      imageBase64: customer.imageBase64,
    };
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1>Edit Customer</h1>
            <form action="#" id="customer-form" onSubmit={this.handleSubmit} className="edit-form-movie">
              {this.renderInput("name", "Name")}
              {this.renderInput("phone", "Phone")}
              {this.renderSelect("isGold", "Gold Customer", this.state.isGold)}
              {this.renderInput("imageBase64", "User Image", "file", false, "*jpg", this.inputRef)}
              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomersForm;
