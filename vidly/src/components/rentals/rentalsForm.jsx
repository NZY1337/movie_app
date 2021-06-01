import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";

import { getMoviesApi } from "../../services/movieService";
import { getCustomers } from "../../services/customerService";
import { saveRental, getRentals, getRental } from "../../services/rentalService";

class RentalsForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      customers: [],
      data: {
        customerId: "",
        movieId: "",
      },
      errors: {},
    };
  }

  schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  };

  async populateMovies() {
    const { data: movies } = await getMoviesApi();

    this.setState({
      movies,
    });
  }

  async populateCustomers() {
    const { data: customers } = await getCustomers();
    this.setState({
      customers,
    });
  }

  doSubmitRental = async (e) => {
    try {
      const { id } = this.props.match.params;
      await saveRental(this.state.data, id);
      this.props.history.push("/rentals");
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.populateCustomers();
    this.populateMovies();
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1>Add New Rental</h1>

            <form id="rental-form" onSubmit={this.handleSubmit}>
              {this.renderSelect("customerId", "Customers", this.state.customers)}
              {this.renderSelect("movieId", "Movies", this.state.movies)}
              {this.renderButton("Save")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RentalsForm;
