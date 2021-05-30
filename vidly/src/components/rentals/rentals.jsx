import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getRentals } from "../../services/rentalService";
import SingleDefaultLayout from "../common/singleDefaultLayout";
import SingleRental from "./singleRental";

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
      <div className="row">
        <div className="col-lg8">
          <h1>Rentals</h1>
          <Link className="btn popcorn-btn" to="/rentals/new">
            Add New Rental
          </Link>

          <div className="renderRentals">
            {rentals.map((rental) => {
              return <SingleRental {...rental} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rentals;
