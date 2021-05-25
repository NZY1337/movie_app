import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getCustomers} from '../../services/customerService'
import Customer from './singleCustomer';


const Customers = () => {

    const [customers, setCustomers] = useState([]);

    useEffect(() =>{ 
        async function fetchCustomers() {
            const {data:customers} = await getCustomers();
            setCustomers(customers);
        }

        fetchCustomers()
    }, [])



    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <h1>Customers</h1>
                    <Link className="btn popcorn-btn" to="/customers/new">Add New Customer</Link>

                    {/* does make sense using spread operator */}
                    <div className="renderCustomers">
                        {customers.length !== 0 && customers.map(customer => {
                            return <Customer key={customer._id} {...customer}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
