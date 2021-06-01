import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";

import { saveReturn } from "../../services/returnService";
import { getRentals, deleteRental } from "../../services/rentalService";
import ReturnedMovies from "./returnedMovies";

class ReturnsForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      rentals: [],
      movies: [],
      customers: [],
      returnedRentals: {
        customer: "",
        movie: "",
        dateReturned: "",
        rentalFee: 0,
      },
      data: {
        customerId: "",
        movieId: "",
        movieTitle: "koko",
        dateReturned: new Date(),
        rentalFee: 2,
        // 3 more fields for customersApi with the rented dates
      },
      errors: {},
    };
  }

  schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
    movieTitle: Joi.string(),
    dateReturned: Joi.date(),
    rentalFee: Joi.number(),
  };

  async populateRentals() {
    const rentals = await this.fetchRentals();

    const unreturnedRentals = rentals.filter((rental) => {
      return !rental.hasOwnProperty("dateReturned");
    });

    for (let rental of unreturnedRentals) {
      this.setState({
        customers: [...this.state.customers, rental.customer],
        movies: [...this.state.movies, rental.movie],
      });
    }
  }

  async fetchRentals() {
    const { data: rentals } = await getRentals();
    this.setState({
      rentals,
    });

    return rentals;
  }

  doSubmitReturn = async () => {
    let rentalId;
    try {
      const { data } = await saveReturn(this.state.data);
      rentalId = data._id;

      this.setState({
        returnedRentals: {
          customer: data.customer.name,
          movie: data.movie.title,
          dateReturned: data.dateReturned,
          rentalFee: data.rentalFee,
        },
      });
    } catch (err) {
      console.log(err);
    }

    try {
      const returnedRental = await deleteRental(rentalId);
      console.log(returnedRental.data);
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.populateRentals();
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <h2 className="mb-4">Add New Return</h2>

            <form id="return-form" onSubmit={this.handleSubmit}>
              {this.renderSelect("customerId", "Customers", this.state.customers)}
              {this.renderSelect("movieId", "Movies", this.state.movies)}
              {this.renderButton("Return")}
            </form>
          </div>

          <ReturnedMovies rental={this.state.returnedRentals} />
        </div>
      </div>
    );
  }
}

export default ReturnsForm;
