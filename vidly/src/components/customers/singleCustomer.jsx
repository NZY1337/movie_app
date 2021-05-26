import React from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../../utils/images/person_placeholder.jpg";

const img = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  marginRight: "1.5rem",
};

const Customer = ({ deleteCustomer, imageBase64, name, phone, isGold, _id }) => {
  const renderUserImage = (image) => {
    if (image === null) {
      return <img style={img} className="img-fluid" src={defaultProfile} />;
    } else {
      return <img style={img} className="img-fluid" src={process.env.PUBLIC_URL + `/images/${imageBase64}`} />;
    }
  };

  return (
    <div style={{ display: "flex", marginBottom: "2rem", borderBottom: "1px solid black" }}>
      {renderUserImage(imageBase64)}

      <div>
        <Link to={`/customers/${_id}`}>{name}</Link>
        <p>{phone}</p>
        <p>Is Gold: {isGold ? "yes" : "no"}</p>

        <button
          className="btn btn-danger"
          onClick={() => {
            deleteCustomer(_id);
          }}
        >
          Delete Customer
        </button>
      </div>
    </div>
  );
};

export default Customer;
