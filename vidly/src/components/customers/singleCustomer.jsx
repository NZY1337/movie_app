import React from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../../utils/images/person_placeholder.jpg";
import SingleDefaultLayout from "../common/singleDefaultLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Customer = ({ deleteCustomer, imageBase64, name, phone, isGold, _id }) => {
  const renderUserImage = (image) => {
    if (image === null) {
      return <img className="img-fluid" src={defaultProfile} />;
    } else {
      return <img className="img-fluid" src={process.env.PUBLIC_URL + `/images/${imageBase64}`} />;
    }
  };

  return (
    <SingleDefaultLayout>
      <div className="top-card">
        {renderUserImage(imageBase64)}
        <div className="edit-client-wrapper">
          <Link to={`/customers/${_id}`}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </div>
      </div>

      <div className="bottom-card">
        <h5>{name}</h5>

        <p>
          Phone: <b>{phone}</b>
        </p>
        <p>
          Gold Client: <b>{isGold ? "yes" : "no"}</b>
        </p>

        <button
          className="btn btn-danger btn-delete-customer"
          onClick={() => {
            deleteCustomer(_id);
          }}
        >
          Delete Customer
        </button>
      </div>
    </SingleDefaultLayout>
  );
};

export default Customer;
