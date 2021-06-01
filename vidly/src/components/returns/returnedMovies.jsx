import React from "react";
import moment from "moment";
import personalInfo from "../../utils/images/undraw_personal.svg";

const ReturnedMovies = ({ rental }) => {
  return (
    <>
      {rental.dateReturned && (
        <div className="col-lg-6">
          <h2 className="mb-4">Returned Movies from Customers:</h2>
          <img className="img-fluid w-25 mb-4" src={personalInfo} alt="" />

          <ul>
            <li key={rental._id} className="mb-2">
              <u>{rental.customer}</u> has returned the movie{" "}
              <b>
                <i>{rental.movie}</i>
              </b>{" "}
              on{" "}
              <span style={{ color: "#6C63FF", fontWeight: 600 }}>
                {moment(rental.dateReturned).format("MMM Do YYYY")}.
              </span>{" "}
              Total Fee: {rental.rentalFee}$.
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ReturnedMovies;
