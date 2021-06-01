import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCustomers, deleteCustomer } from "../../services/customerService";
import Customer from "./singleCustomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleArrows } from "@fortawesome/free-solid-svg-icons";

import "./customer.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      const { data: customers } = await getCustomers();
      setCustomers(customers);
    }

    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (id) => {
    const originalCustomers = [...customers];
    const deletedCustomers = originalCustomers.filter((c) => c._id !== id);

    setCustomers(deletedCustomers);

    try {
      await deleteCustomer(id);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log(`Error: ${err}`);

        this.setState({
          customers: originalCustomers,
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-5 d-flex justify-content-between align-items-center">
          <h1>Customers</h1>
          <Link className="btn popcorn-btn" to="/customers/new">
            <FontAwesomeIcon icon={faPeopleArrows} style={{ color: "tomato" }} />
            <span className="ml-2 font-weight-bold">Add New Customer</span>
          </Link>
        </div>
      </div>

      <div className="row renderCustomers">
        {/* does make sense using spread operator */}
        {customers.length !== 0 &&
          customers.map((customer) => {
            return <Customer deleteCustomer={handleDeleteCustomer} key={customer._id} {...customer} />;
          })}
      </div>
    </div>
  );
};

export default Customers;
