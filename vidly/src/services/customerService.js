import axios from 'axios'
import api from '../config.json'

export async function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer }
    delete body._id
    return axios.put(api.CUSTOMERS_API + '/' + customer._id, body)
  }

  return axios.post(api.CUSTOMERS_API, customer)
}
