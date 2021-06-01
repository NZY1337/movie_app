import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getRentals } from "../../services/rentalService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    async function fetchRentals() {
      const { data: rentals } = await getRentals();
      setRentals(rentals);
    }

    fetchRentals();
  }, []);

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-12 d-flex align-items-center justify-content-between">
          <h1>Rentals</h1>
          <Link className="btn popcorn-btn" to="/rentals/new">
            <FontAwesomeIcon style={{ color: "tomato" }} icon={faVideo} />
            <span className="ml-2 font-weight-bold">New Rental</span>
          </Link>
        </div>
      </div>

      {rentals && rentals.length > 0 && (
        <div className="row">
          <div className="col-lg-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Movie Rented</th>
                  <th>Movie Price/Day</th>
                  <th>Rental Date</th>
                  <th>Phone</th>
                </tr>
              </thead>

              <tbody>
                {rentals.map((rental) => {
                  return (
                    <tr>
                      <td>{rental.customer.name}</td>
                      <td>{rental.movie.title}</td>
                      <td>{rental.movie.dailyRentalRate}$</td>
                      <td>{moment(rental.dateOut).format("MMM Do YYYY")}</td>
                      <td>+ {rental.customer.phone}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {rentals.length === 0 && <h3>No Rentals at this moment...</h3>}
    </div>
  );
};

export default Rentals;
