import React from "react";

import SingleDefaultLayout from "../common/singleDefaultLayout";

const SingleRental = ({ customer, movie }) => {
  return (
    <SingleDefaultLayout>
      <div>
        <p>{customer.name}</p>

        <p>
          movie rented: <b>{movie.title}</b>
        </p>
        <p>
          phone: <b>{customer.phone}</b>
        </p>
      </div>
    </SingleDefaultLayout>
  );
};

export default SingleRental;
